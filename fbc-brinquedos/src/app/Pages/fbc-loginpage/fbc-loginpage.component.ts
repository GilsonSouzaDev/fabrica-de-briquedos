import { Component, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FbcLoginComponent } from '../../components/fbc-login/fbc-login.component';
import { ActionDialogComponent } from '../../shared/components/action-dialog/action-dialog.component';
import { AuthApiService } from '../../services/auth-api.service';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';

@Component({
  selector: 'app-fbc-loginpage',
  standalone: true,
  imports: [FbcLoginComponent],
  templateUrl: './fbc-loginpage.component.html',
  styleUrls: ['./fbc-loginpage.component.scss'],
})
export class FbcLoginpageComponent {
  private authApi = inject(AuthApiService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private ngZone = inject(NgZone); // 🔹 importante

  onUserAdmin(user: UsuarioAdmin) {
    const credenciais = { email: user.userEmail, senha: user.userSenha };

    this.authApi.login(credenciais).subscribe({
      next: (sucesso) => {
        if (sucesso) {
          this.dialog
            .open(ActionDialogComponent, {
              width: '400px',
              data: {
                title: 'Sucesso!',
                message: 'Login realizado com êxito.',
                confirmButtonText: 'Ok',
                cancelButtonText: '',
                action: async () => Promise.resolve(),
              },
            })
            .afterClosed()
            .subscribe(() => {
              // 🔹 Redirecionamento dentro do NgZone
              this.ngZone.run(() => this.router.navigate(['/admin']));
            });
        } else {
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
      },
      error: () => {
        this.dialog.open(ActionDialogComponent, {
          width: '400px',
          data: {
            title: 'Erro',
            message: 'Ocorreu um erro no servidor.',
            confirmButtonText: 'Fechar',
            cancelButtonText: '',
            action: async () => Promise.reject(new Error('Erro no servidor')),
          },
        });
      },
    });
  }
}
