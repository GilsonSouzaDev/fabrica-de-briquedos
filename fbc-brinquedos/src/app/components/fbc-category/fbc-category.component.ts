import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from '../../interfaces/categoria';

@Component({
  selector: 'app-fbc-category',
  imports: [],
  templateUrl: './fbc-category.component.html',
  styleUrl: './fbc-category.component.scss',
})
export class FbcCategoryComponent {

  @Input() categoria!: Categoria;
  @Output() categoryClicked = new EventEmitter<string>();

  onClick(): void {
    this.categoryClicked.emit(this.categoria.titulo); // Emite o título da categoria
  }

  
}
