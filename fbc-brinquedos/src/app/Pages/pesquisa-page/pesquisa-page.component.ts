// src/app/Pages/pesquisa-page/pesquisa-page.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs/operators';

import { BrinquedoApiService } from '../../services/brinquedo-api.service';
import { Brinquedo } from '../../interfaces/brinquedo';
import { FbcCardComponent } from '../../components/fbc-card/fbc-card.component';
import { SearchService } from '../../shared/services/search.service';
import { StringUtils } from '../../utils/string-utils';


@Component({
  selector: 'app-pesquisa-page',
  standalone: true,
  imports: [CommonModule, FbcCardComponent],
  templateUrl: './pesquisa-page.component.html',
  styleUrls: ['./pesquisa-page.component.scss'],
})
export class PesquisaPageComponent implements OnInit {
  private searchService = inject(SearchService);
  private brinquedoApiService = inject(BrinquedoApiService);
  private router = inject(Router);

  public isLoading = true;
  public noResults = false;
  public searchTerm$ = this.searchService.searchTerm$;

  private allBrinquedos$!: Observable<Brinquedo[]>;
  public brinquedos$!: Observable<Brinquedo[]>;

  ngOnInit(): void {
    this.allBrinquedos$ = this.brinquedoApiService.getBrinquedos().pipe(
      tap(() => (this.isLoading = false)),
      startWith([])
    );

    this.brinquedos$ = combineLatest([
      this.allBrinquedos$,
      this.searchTerm$.pipe(debounceTime(200), distinctUntilChanged()),
    ]).pipe(
      map(([allBrinquedos, searchTerm]) => {
        this.noResults = false;

        // --- LÓGICA PRINCIPAL AQUI ---
        if (!searchTerm.trim()) {
          this.router.navigate(['']);
          return [];
        }

        const filteredBrinquedos = StringUtils.filterByTerm(
          allBrinquedos,
          searchTerm,
          'descricao'
        );

        if (filteredBrinquedos.length === 0) {
          // 2. SE NÃO HÁ RESULTADOS, MOSTRA A MENSAGEM E NAVEGA APÓS 1 SEGUNDO
          this.handleNoResults();
        }

        return filteredBrinquedos;
      })
    );
  }

  private handleNoResults(): void {
    this.noResults = true;
    setTimeout(() => {
      // Verifica se o usuário não digitou algo novo enquanto o timer estava rodando
      if (this.noResults) {
        this.router.navigate(['']);
      }
    }, 2000);
  }
}
