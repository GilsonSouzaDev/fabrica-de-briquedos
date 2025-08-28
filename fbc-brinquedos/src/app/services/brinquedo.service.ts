import { Injectable } from '@angular/core';
import { Brinquedo } from '../interfaces/brinquedo';
import { BRINQUEDOS } from '../data/brinquedo';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrinquedoService {
  private listaDeBrinquedos: Brinquedo[] = BRINQUEDOS;

  constructor() {}

  getBrinquedos(): Observable<Brinquedo[]> {
    return of(this.listaDeBrinquedos);
  }

  getBrinquedosDestaque(): Observable<Brinquedo[]> {
    const QUANTIDADE_MAXIMA_DESTAQUES = 8;

    return this.getBrinquedos().pipe(
      map((brinquedos) =>
        // 1. Cria uma cópia para não modificar o array original.
        [...brinquedos]
          // 2. Ordena pela quantidade de vendas, do maior para o menor.
          .sort((a, b) => b.quantVendas - a.quantVendas)
          // 3. Pega apenas os 8 primeiros itens da lista ordenada.
          .slice(0, QUANTIDADE_MAXIMA_DESTAQUES)
      )
    );
  }

  getCategorias(): Observable<string[]> {
    return this.getBrinquedos().pipe(
      map((brinquedos) => {
        // Usamos Set para garantir que cada categoria apareça apenas uma vez.
        const categoriasUnicas = new Set(brinquedos.map((b) => b.categoria));
        return [...categoriasUnicas].sort(); // Retorna como um array ordenado.
      })
    );
  }
}
