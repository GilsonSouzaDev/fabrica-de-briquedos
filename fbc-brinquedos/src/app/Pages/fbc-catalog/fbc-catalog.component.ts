import { CategoriaService } from './../../services/categoria.service';
//import { BrinquedoService } from './../../services/brinquedo.service'; // Supondo que você tenha um serviço para brinquedos
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Categoria } from '../../interfaces/categoria';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FbcCategoryComponent } from '../../components/fbc-category/fbc-category.component';
import { Brinquedo } from '../../interfaces/brinquedo';
import { FbcCardComponent } from '../../components/fbc-card/fbc-card.component';
import { BrinquedoApiService } from '../../services/brinquedo-api.service';

@Component({
  selector: 'app-fbc-catalog',
  standalone: true, // Garanta que o componente é standalone
  imports: [CommonModule, FbcCategoryComponent, FbcCardComponent],
  templateUrl: './fbc-catalog.component.html',
  styleUrl: './fbc-catalog.component.scss',
})
export class FbcCatalogComponent implements OnInit {

  categoria$!: Observable<Categoria[]>;
  brinquedosFiltrados$!: Observable<Brinquedo[]>;

  selectedCategory: WritableSignal<string | null> = signal(null);

  constructor(
    private readonly categoryService: CategoriaService,
    private readonly brinquedoService: BrinquedoApiService // Injete o serviço de brinquedos
  ) {}

  ngOnInit(): void {
    this.categoria$ = this.categoryService.getCategoria();
  }

  /**
   * Chamado quando um componente de categoria é clicado.
   * @param categoryTitle O título da categoria que foi clicada.
   */
  onCategorySelected(categoryTitle: string): void {
    console.log('Categoria selecionada:', categoryTitle);

    // 1. Atualiza o signal com o título da categoria selecionada
    this.selectedCategory.set(categoryTitle);

    this.brinquedosFiltrados$ =
      this.brinquedoService.getBrinquedosPorCategoria(categoryTitle);
  }

  goBackToCategories(): void {
    this.selectedCategory.set(null);
  }
}
