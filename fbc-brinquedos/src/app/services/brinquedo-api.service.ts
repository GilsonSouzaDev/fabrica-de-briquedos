import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Brinquedo } from '../interfaces/brinquedo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrinquedoApiService {
  private apiUrl = `${environment.apiUrl}/brinquedo`;

  constructor(private http: HttpClient) {}

  // GET - lista todos os brinquedos
  getBrinquedos(): Observable<Brinquedo[]> {
    return this.http.get<Brinquedo[]>(`${this.apiUrl}/`);
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

  // GET - busca por ID
  getBrinquedoPorId(id: number): Observable<Brinquedo> {
    return this.http.get<Brinquedo>(`${this.apiUrl}/${id}`);
  }

  // GET - busca por nome
  getBrinquedosPorNome(nome: string): Observable<Brinquedo[]> {
    return this.http.get<Brinquedo[]>(`${this.apiUrl}/buscar/${nome}`);
  }

  // POST - adiciona novo brinquedo
  adicionarBrinquedo(brinquedo: Brinquedo): Observable<Brinquedo> {
    return this.http.post<Brinquedo>(`${this.apiUrl}`, brinquedo);
  }

  // PUT - atualiza brinquedo
  atualizarBrinquedo(
    id: number,
    brinquedo: Partial<Brinquedo>
  ): Observable<Brinquedo> {
    return this.http.put<Brinquedo>(`${this.apiUrl}/${id}`, brinquedo);
  }

  // DELETE - remove brinquedo
  removerBrinquedo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
