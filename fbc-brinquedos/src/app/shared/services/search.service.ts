// src/app/shared/search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // 1. Cria um BehaviorSubject privado para guardar o termo de busca.
  //    Ele começa com uma string vazia.
  private searchTermSource = new BehaviorSubject<string>('');

  // 2. Expõe um Observable público. Os componentes vão "ouvir" este observable.
  public searchTerm$ = this.searchTermSource.asObservable();

  constructor() {}

  /**
   * 3. Método público para que qualquer componente possa atualizar o termo de busca.
   */
  updateSearchTerm(term: string): void {
    this.searchTermSource.next(term);
  }
}
