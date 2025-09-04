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
import { DialogService } from '../../shared/services/dialog.service';

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
  private dialogService = inject(DialogService);

  brinquedos$!: Observable<Brinquedo[]>;
  paginatedBrinquedos$!: Observable<Brinquedo[]>;
  private pageIndex$ = new BehaviorSubject(0);
  private pageSize$ = new BehaviorSubject(5);
  view: ViewMode = 'list';
  formMode: FormMode = 'create';
  currentToy!: Brinquedo;
  private latestBrinquedos: Brinquedo[] = [];

  ngOnInit(): void {
    this.brinquedos$ = this.brinquedoService.getBrinquedos();
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

  // --- handleEdit CORRIGIDO: SEM DIÁLOGO ---
  // A responsabilidade é apenas preparar o formulário para edição.
  handleEdit(id: number): void {
    const found = this.latestBrinquedos.find((b) => b.id === id);
    if (found) {
      this.currentToy = { ...found };
      this.formMode = 'edit';
      this.view = 'form';
    } else {
      // Fallback caso o item não esteja na lista local
      this.brinquedoService.getBrinquedoPorId(id).subscribe((item) => {
        this.currentToy = { ...item };
        this.formMode = 'edit';
        this.view = 'form';
      });
    }
  }

  // --- handleRemove COM DIÁLOGO ---
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
        this.view = 'list';
      }
    });
  }

  // --- onSave COM DIÁLOGO PARA CRIAR E EDITAR ---
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
      // formMode === 'edit'
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
