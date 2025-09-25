import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
