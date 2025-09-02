// pages/fbc-admin/fbc-admin.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { Brinquedo } from '../../interfaces/brinquedo';
import { BrinquedoService } from '../../services/brinquedo.service';
import { FbcAdminListComponent } from '../../components/fbc-admin-list/fbc-admin-list.component';
import { FbcFormComponent } from '../../components/fbc-form/fbc-form.component';
import { CustomPaginator } from '../../utils/custom-paginator-intl';
import { paginate } from '../../utils/pagination.util';

type ViewMode = 'list' | 'form';
type FormMode = 'create' | 'edit';

@Component({
  selector: 'app-fbc-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FbcAdminListComponent,
    FbcFormComponent,
],
  templateUrl: './fbc-admin.component.html',
  styleUrl: './fbc-admin.component.scss',
  providers: [{ provide: MatPaginatorIntl, useFactory: CustomPaginator }],
})
export class FbcAdminComponent {
  private brinquedoService = inject(BrinquedoService);

  // streams
  brinquedos$!: Observable<Brinquedo[]>;
  paginatedBrinquedos$!: Observable<Brinquedo[]>;

  // paginação
  private pageIndex$ = new BehaviorSubject(0);
  private pageSize$ = new BehaviorSubject(5);

  // estado de tela/form
  view: ViewMode = 'list';
  formMode: FormMode = 'create';
  currentToy!: Brinquedo;

  // snapshot para achar item por id ao editar
  private latestBrinquedos: Brinquedo[] = [];

  ngOnInit(): void {
    this.brinquedos$ = this.brinquedoService.getBrinquedos();

    // guardar snapshot
    this.brinquedos$.subscribe((list) => (this.latestBrinquedos = list ?? []));

    this.paginatedBrinquedos$ = combineLatest([
      this.brinquedos$,
      this.pageIndex$,
      this.pageSize$,
    ]).pipe(
      map(([brinquedos, pageIndex, pageSize]) =>
        paginate(brinquedos ?? [], { pageIndex, pageSize })
      )
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex$.next(event.pageIndex);
    this.pageSize$.next(event.pageSize);
  }

  // === ações de UI ===
  newToy(): void {
    this.formMode = 'create';
    this.currentToy = {
      id: 0,
      codigo: 0,
      descricao: '',
      categoria: '',
      marca: '',
      imagem: '',
      valor: 0,
      detalhes: '',
      quantVendas: 0,
    };
    this.view = 'form';
  }

  handleEdit(id: number): void {
    const found = this.latestBrinquedos.find((b) => b.id === id);
    if (found) {
      // clonar para não mutar a lista
      this.currentToy = { ...found };
      this.formMode = 'edit';
      this.view = 'form';
    } else {
      // fallback: buscar do serviço, se preferir
      this.brinquedoService.getBrinquedoPorId(id).subscribe((item) => {
        this.currentToy = { ...item };
        this.formMode = 'edit';
        this.view = 'form';
      });
    }
  }

  handleRemove(id: number): void {
    // lógica de remoção
    this.brinquedoService.removerBrinquedo(id).subscribe(() => {
      // serviço deve atualizar a stream interna (ou recarregar)
      // aqui só garantimos que a tela continue na lista
      this.view = 'list';
    });
  }

  onSave(toy: Brinquedo): void {
    if (this.formMode === 'create') {
      this.brinquedoService.adicionarBrinquedo(toy).subscribe(() => {
        this.afterPersist();
      });
    } else {
      // segurança: garantir que id exista na edição
      if (!toy.id) return;
      this.brinquedoService.atualizarBrinquedo(toy.id, toy).subscribe(() => {
        this.afterPersist();
      });
    }
  }

  onCancelForm(): void {
    this.view = 'list';
  }

  private afterPersist(): void {
    // opcional: resetar paginação ou manter
    this.pageIndex$.next(0);
    // o serviço deve emitir a nova lista (BehaviorSubject/shareReplay ou refetch)
    this.view = 'list';
  }
}
