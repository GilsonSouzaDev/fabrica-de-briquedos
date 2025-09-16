import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brinquedo } from '../../interfaces/brinquedo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fbc-admin-list',
  imports: [CommonModule],
  templateUrl: './fbc-admin-list.component.html',
  styleUrl: './fbc-admin-list.component.scss',
})
export class FbcAdminListComponent {

  // RECEBE os dados. Não busca, não conhece serviços.
  @Input() brinquedos: Brinquedo[] | null = [];
  @Input() isLoading = false;

  // ENVIA eventos para o componente pai.
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onEdit(id: number): void {
    // Apenas emite o evento com o ID para quem estiver usando o componente.
    this.edit.emit(id);
  }

  onRemove(id: number): void {
    // Apenas emite o evento com o ID.
    this.remove.emit(id);
  }
}
