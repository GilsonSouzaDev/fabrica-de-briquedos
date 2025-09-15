// 1. Importações necessárias
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FbcLoginComponent } from '../../components/fbc-login/fbc-login.component';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-fbc-loginpage',
  imports: [FbcLoginComponent],
  templateUrl: './fbc-loginpage.component.html',
  styleUrl: './fbc-loginpage.component.scss',
})
export class FbcLoginpageComponent {
  // 2. Injetando os serviços
  private authService = inject(AuthService);
  private router = inject(Router);

  // 3. Modificando o método onUserAdmin
  onUserAdmin(user: UsuarioAdmin) {
    // Extrai os dados do evento recebido
    const credenciais = {
      email: user.userEmail,
      senha: user.userSenha,
    };

    // Chama o serviço de autenticação
    const sucesso = this.authService.login(credenciais);

    if (sucesso) {
      // Se o login for bem-sucedido, navega para a página de admin
      this.router.navigate(['/admin']);
    } else {
      // Se o login falhar, informa o usuário
      // (Em um passo futuro, podemos passar um estado de erro para o dumb component)
      alert('Email ou senha inválidos. Por favor, tente novamente.');
      console.error(
        'Tentativa de login falhou para o usuário:',
        user.userEmail
      );
    }
  }
}
