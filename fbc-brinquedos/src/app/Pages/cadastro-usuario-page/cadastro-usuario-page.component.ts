import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CadastroFormComponent } from '../../components/cadastro-form/cadastro-form.component';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { UsuarioApiService } from '../../services/usuario-api.service';
import { ActionDialogComponent, ActionDialogData } from '../../shared/components/action-dialog/action-dialog.component';
import { AlertDialogComponent, AlertDialogData } from '../../shared/components/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-cadastro-usuario-page',
  standalone: true,
  imports: [CommonModule, CadastroFormComponent, RouterLink],
  templateUrl: './cadastro-usuario-page.component.html',
  styleUrls: ['./cadastro-usuario-page.component.scss'],
})
export class CadastroUsuarioPageComponent {
  constructor(
    private usuarioService: UsuarioApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  handleCadastro(formValue: Partial<UsuarioAdmin>): void {
    // 🔹 Abre o diálogo de confirmação antes de cadastrar
    const dialogRef = this.dialog.open(ActionDialogComponent, {
      width: '420px',
      data: {
        title: 'Confirmar cadastro',
        message: 'Deseja realmente cadastrar este usuário?',
        confirmButtonText: 'Cadastrar',
        cancelButtonText: 'Cancelar',
        action: () => this.usuarioService.cadastrar(formValue),
      } as ActionDialogData,
    });

    // 🔹 Quando o diálogo é fechado
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        // result === true → cadastro bem-sucedido
        if (result) {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        // ⚠️ Se houver erro inesperado fora do fluxo do ActionDialog
        console.error('Erro inesperado:', error);

        this.dialog.open(AlertDialogComponent, {
          width: '400px',
          data: {
            title: 'Erro inesperado',
            message:
              'Ocorreu um erro durante o cadastro. <br>Por favor, tente novamente mais tarde.',
            confirmButtonText: 'OK',
          } as AlertDialogData,
        });
      },
    });
  }
}
