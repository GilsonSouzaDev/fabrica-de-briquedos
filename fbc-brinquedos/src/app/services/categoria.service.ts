import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { CATEGORIAS } from '../data/categoria';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  private listaDeCategorias: Categoria[] = CATEGORIAS;

  constructor() {}

  getCategoria(): Observable<Categoria[]> {
    return of(this.listaDeCategorias);
  }

  
}
