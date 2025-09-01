import { Component, inject } from '@angular/core';
import { FbcAdminListComponent } from '../../components/fbc-admin-list/fbc-admin-list.component';
import { CommonModule } from '@angular/common';
import { BrinquedoService } from '../../services/brinquedo.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Brinquedo } from '../../interfaces/brinquedo';
import { paginate } from '../../utils/pagination.util';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginator } from '../../utils/custom-paginator-intl';

@Component({
  selector: 'app-fbc-admin',
  imports: [FbcAdminListComponent, CommonModule, MatPaginatorModule],
  templateUrl: './fbc-admin.component.html',
  styleUrl: './fbc-admin.component.scss',
  providers: [{ provide: MatPaginatorIntl, useFactory: CustomPaginator }],
})
export class FbcAdminComponent {
  private brinquedoService = inject(BrinquedoService);

  // A página gerencia o Observable, não o componente da tabela
  brinquedos$!: Observable<Brinquedo[]>;

  // Estado da paginação controlado por BehaviorSubject
  private pageIndex$ = new BehaviorSubject(0);
  private pageSize$ = new BehaviorSubject(5);

  // Observable com lista já paginada
  paginatedBrinquedos$!: Observable<Brinquedo[]>;

  ngOnInit(): void {
    this.brinquedos$ = this.brinquedoService.getBrinquedos();

    this.paginatedBrinquedos$ = combineLatest([
      this.brinquedos$,
      this.pageIndex$,
      this.pageSize$,
    ]).pipe(
      map(([brinquedos, pageIndex, pageSize]) =>
        paginate(brinquedos, { pageIndex, pageSize })
      )
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex$.next(event.pageIndex);
    this.pageSize$.next(event.pageSize);
  }

  // A página é responsável por tratar os eventos emitidos pelo filho
  handleEdit(id: number): void {
    console.log('PÁGINA: Recebeu evento para EDITAR o id:', id);
    // Lógica de navegação ou abrir modal de edição ficaria aqui
  }

  handleRemove(id: number): void {
    console.log('PÁGINA: Recebeu evento para REMOVER o id:', id);
    // Lógica de deleção e atualização da lista ficaria aqui
  }
}
