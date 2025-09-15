// 1. Importações Essenciais
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAdmin } from '../interfaces/usuario-admin';
import { LISTA_DE_USUARIOS } from '../data/usuarios';
 // <-- IMPORTE SUA LISTA AQUI

// 2. O Decorador @Injectable
@Injectable({
  providedIn: 'root',
})
// 3. A Classe do Serviço
export class AuthService {
  // 4. O "Signal" para o Estado de Login
  public currentUserSig: WritableSignal<UsuarioAdmin | null | undefined> =
    signal(undefined);

  // 5. O Construtor com Injeção de Dependência
  constructor(private router: Router) {}

  // 6. O Método de Login
  login(dadosLogin: { email: string; senha: string }): boolean {
    const usuarioEncontrado = LISTA_DE_USUARIOS.find(
      (user) =>
        user.userEmail === dadosLogin.email && user.userSenha === dadosLogin.senha
    );

    if (usuarioEncontrado) {
      // Sucesso no login
      this.currentUserSig.set(usuarioEncontrado); // 7. Atualiza o Signal
      return true;
    } else {
      // Falha no login
      this.currentUserSig.set(null);
      return false;
    }
  }

  // 8. O Método de Logout
  logout(): void {
    this.currentUserSig.set(null);
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
