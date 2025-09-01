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

  getBrinquedosPorCategoria(tituloCategoria: string): Observable<Brinquedo[]> {
    return this.getBrinquedos().pipe(
      map((brinquedos) =>
        brinquedos.filter(
          (brinquedo) => brinquedo.categoria === tituloCategoria
        )
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

  getBrinquedoPorId(id: number): Observable<Brinquedo> {
    return this.getBrinquedos().pipe(
      map((brinquedos) => {
        const brinquedo = brinquedos.find((b) => b.id === id);
        if (!brinquedo) {
          throw new Error(`Brinquedo com id ${id} não encontrado`);
        }
        return brinquedo;
      })
    );
  }

  adicionarBrinquedo(novo: Brinquedo): Observable<Brinquedo> {
    this.listaDeBrinquedos.push(novo);
    return of(novo);
  }

  atualizarBrinquedo(
    id: number,
    dados: Partial<Brinquedo>
  ): Observable<Brinquedo> {
    const index = this.listaDeBrinquedos.findIndex((b) => b.id === id);
    if (index >= 0) {
      this.listaDeBrinquedos[index] = {
        ...this.listaDeBrinquedos[index],
        ...dados,
      };
      return of(this.listaDeBrinquedos[index]);
    }
    return of();
  }

  removerBrinquedo(id: number): Observable<boolean> {
    const index = this.listaDeBrinquedos.findIndex((b) => b.id === id);
    if (index >= 0) {
      this.listaDeBrinquedos.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
