import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UsuarioAdmin } from '../interfaces/usuario-admin'; // Mantive sua interface

@Injectable({
  providedIn: 'root',
})
export class UsuarioApiService {
  private readonly apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UsuarioAdmin[]> {
    return this.http.get<UsuarioAdmin[]>(this.apiUrl).pipe(
      tap(() => console.log('Lista de usuários obtida com sucesso.')),
      catchError(this.handleError)
    );
  }

  verificarEmail(email: string): Observable<boolean> {
    return this.getUsuarios().pipe(
      map((usuarios: UsuarioAdmin[]) => {
        return usuarios.some(
          (usuario) => usuario.userEmail.toLowerCase() === email.toLowerCase()
        );
      }),
      catchError((error) => {
        console.error(
          'Falha ao obter a lista de usuários para verificar o e-mail:',
          error
        );
        return of(false);
      })
    );
  }

  /**
   * Envia os dados de um novo usuário para a API para cadastro.
   * @param usuario - O objeto parcial contendo os dados do usuário a ser cadastrado.
   * @returns Um Observable com a resposta da API.
   */
  cadastrar(usuario: Partial<UsuarioAdmin>): Observable<UsuarioAdmin> {
    return this.http.post<UsuarioAdmin>(this.apiUrl, usuario).pipe(
      tap((response) =>
        console.log('Usuário cadastrado com sucesso via API:', response)
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else {
      errorMessage = `Erro do servidor: ${error.status}, mensagem: ${error.message}`;
      if (error.status === 400) {
        errorMessage =
          'Dados inválidos. Por favor, verifique os campos e tente novamente.';
      } else if (error.status === 409) {
        errorMessage = 'O email informado já está em uso.';
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
