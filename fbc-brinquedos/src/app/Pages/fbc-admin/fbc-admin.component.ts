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
// import { BrinquedoService } from '../../services/brinquedo.service';
import { FbcAdminListComponent } from '../../components/fbc-admin-list/fbc-admin-list.component';
import { FbcFormComponent } from '../../components/fbc-form/fbc-form.component';
import { CustomPaginator } from '../../utils/custom-paginator-intl';
import { paginate } from '../../utils/pagination.util';
import { DialogService } from '../../shared/services/dialog.service';
import { getNextCodigo } from '../../utils/codigo.util';
import { BrinquedoApiService } from '../../services/brinquedo-api.service';

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
  private brinquedoService = inject(BrinquedoApiService);
  private dialogService = inject(DialogService);

  brinquedos$!: Observable<Brinquedo[]>;

  // --- NOVO: Subject local que controla a lista exibida ---
  private localBrinquedos$ = new BehaviorSubject<Brinquedo[]>([]);

  paginatedBrinquedos$!: Observable<Brinquedo[]>;
  private pageIndex$ = new BehaviorSubject(0);
  private pageSize$ = new BehaviorSubject(5);
  view: ViewMode = 'list';
  formMode: FormMode = 'create';
  currentToy!: Brinquedo;

  private latestBrinquedos: Brinquedo[] = [];

  ngOnInit(): void {
    // carrega a lista original
    this.brinquedos$ = this.brinquedoService.getBrinquedos();

    // mantém a cópia local e joga no BehaviorSubject
    this.brinquedos$.subscribe((list) => {
      this.latestBrinquedos = list ?? [];
      this.localBrinquedos$.next(this.latestBrinquedos);
    });

    // paginação agora usa a lista local
    this.paginatedBrinquedos$ = combineLatest([
      this.localBrinquedos$,
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

  newToy(): void {
    this.formMode = 'create';

   const nextCode = getNextCodigo(this.latestBrinquedos);


    this.currentToy = {
      id: 0,
      codigo: nextCode,
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
      this.currentToy = { ...found };
      this.formMode = 'edit';
      this.view = 'form';
    } else {
      this.brinquedoService.getBrinquedoPorId(id).subscribe((item) => {
        this.currentToy = { ...item };
        this.formMode = 'edit';
        this.view = 'form';
      });
    }
  }

  // --- handleRemove atualizado ---
  handleRemove(id: number): void {
    const toyToRemove = this.latestBrinquedos.find((b) => b.id === id);
    const toyDescription = toyToRemove
      ? `"${toyToRemove.descricao}"`
      : 'o item selecionado';

    const dialogRef = this.dialogService.confirmAction({
      title: 'Confirmar Exclusão',
      message: `Você tem certeza que deseja excluir ${toyDescription}? Esta ação não pode ser desfeita.`,
      confirmButtonText: 'Sim, Excluir',
      cancelButtonText: 'Cancelar',
      action: () => this.brinquedoService.removerBrinquedo(id),
    });

    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        // remove do array local
        this.latestBrinquedos = this.latestBrinquedos.filter(
          (b) => b.id !== id
        );

        // atualiza a lista usada pela tabela
        this.localBrinquedos$.next(this.latestBrinquedos);

        // opcional: voltar para a primeira página para evitar páginas vazias
        this.pageIndex$.next(0);
      }
    });
  }

  onSave(toy: Brinquedo): void {
    if (this.formMode === 'create') {
      const dialogRef = this.dialogService.confirmAction({
        title: 'Confirmar Criação',
        message: `Deseja realmente adicionar o novo brinquedo "${toy.descricao}"?`,
        confirmButtonText: 'Sim, Criar',
        cancelButtonText: 'Não, Voltar',
        action: () => this.brinquedoService.adicionarBrinquedo(toy),
      });

      dialogRef.afterClosed().subscribe((success) => {
        if (success) this.afterPersist();
      });
    } else {
      if (!toy.id) return;

      const dialogRef = this.dialogService.confirmAction({
        title: 'Confirmar Alterações',
        message: `Deseja salvar as alterações feitas no brinquedo "${toy.descricao}"?`,
        confirmButtonText: 'Sim, Salvar',
        cancelButtonText: 'Não, Descartar',
        action: () => this.brinquedoService.atualizarBrinquedo(toy.id!, toy),
      });

      dialogRef.afterClosed().subscribe((success) => {
        if (success) this.afterPersist();
      });
    }
  }

  onCancelForm(): void {
    this.view = 'list';
  }

  private afterPersist(): void {
    this.pageIndex$.next(0);
    this.view = 'list';
  }
}
