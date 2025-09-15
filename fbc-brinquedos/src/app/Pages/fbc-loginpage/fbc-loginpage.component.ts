// 1. Importações necessárias
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FbcLoginComponent } from '../../components/fbc-login/fbc-login.component';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../../shared/components/action-dialog/action-dialog.component';



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
  private dialog = inject(MatDialog);

  // 3. Modificando o método onUserAdmin
  onUserAdmin(user: UsuarioAdmin) {
    const credenciais = {
      email: user.userEmail,
      senha: user.userSenha,
    };

    const sucesso = this.authService.login(credenciais);

    if (sucesso) {
      // abre o diálogo de sucesso
      this.dialog
        .open(ActionDialogComponent, {
          width: '400px',
          data: {
            //não precisa da confirmação nem do action
            title: 'Sucesso!',
            message: 'Login realizado com êxito.',
            confirmButtonText: 'Ok',
            cancelButtonText: '',
            action: async () => Promise.resolve(), // dummy
          },
        })
        .afterClosed()
        .subscribe(() => {
          this.router.navigate(['/admin']);
        });
    } else {
      // abre o diálogo de erro
      this.dialog.open(ActionDialogComponent, {
        width: '400px',
        data: {
          title: 'Falha de Acesso',
          message: 'Email ou senha inválidos. Por favor, tente novamente.',
          confirmButtonText: 'Fechar',
          cancelButtonText: '',
          action: async () =>
            Promise.reject(new Error('Credenciais inválidas')),
        },
      });
    }
  }
}
