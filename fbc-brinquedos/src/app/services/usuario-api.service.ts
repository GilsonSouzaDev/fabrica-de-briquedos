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

  /**
   * Busca todos os usuários cadastrados na API.
   * Corresponde ao endpoint @GetMapping do seu backend.
   * @returns Um Observable contendo um array de UsuarioAdmin.
   */
  getUsuarios(): Observable<UsuarioAdmin[]> {
    return this.http.get<UsuarioAdmin[]>(this.apiUrl).pipe(
      tap(() => console.log('Lista de usuários obtida com sucesso.')),
      catchError(this.handleError)
    );
  }

  /**
   * Verifica se um e-mail já existe na base de dados.
   * Este método é ideal para ser usado pela diretiva de validação assíncrona.
   * @param email - O email a ser verificado.
   * @returns Um Observable<boolean> que emite `true` se o email existir e `false` caso contrário.
   */
  verificarEmail(email: string): Observable<boolean> {
    // Constrói a URL para a busca, por exemplo: /api/usuario/email/existe?email=exemplo@email.com
    // Adapte o endpoint (`/email/existe`) conforme sua API.
    const url = `${this.apiUrl}/email/existe?email=${encodeURIComponent(
      email
    )}`;

    return this.http.get<boolean>(url).pipe(
      catchError((error) => {
        // Se a API falhar, consideramos que o email não existe para não travar o formulário.
        console.error('Falha ao verificar e-mail:', error);
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
      // Erro do lado do cliente
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else {
      // Erro retornado pelo backend
      errorMessage = `Erro do servidor: ${error.status}, mensagem: ${error.message}`;
      if (error.status === 400) {
        errorMessage =
          'Dados inválidos. Por favor, verifique os campos e tente novamente.';
      } else if (error.status === 409) {
        // Exemplo para "Conflito"
        errorMessage = 'O email informado já está em uso.';
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
