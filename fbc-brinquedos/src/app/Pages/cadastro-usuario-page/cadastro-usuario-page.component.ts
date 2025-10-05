import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CadastroFormComponent } from '../../components/cadastro-form/cadastro-form.component';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { UsuarioApiService } from '../../services/usuario-api.service';


@Component({
  selector: 'app-cadastro-usuario-page',
  standalone: true,
  imports: [CommonModule, CadastroFormComponent],
  templateUrl: './cadastro-usuario-page.component.html',
  styleUrls: ['./cadastro-usuario-page.component.scss'],
})
export class CadastroUsuarioPageComponent {
  constructor(private usuarioService: UsuarioApiService, private router: Router) {}

  // O tipo do evento agora é Partial<UsuarioAdmin>
  handleCadastro(formValue: Partial<UsuarioAdmin>): void {
    console.log('Dados recebidos do formulário:', formValue);

    this.usuarioService.cadastrar(formValue).subscribe({
      next: (response) => {
        console.log('Usuário cadastrado com sucesso!', response);
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Falha ao cadastrar usuário:', err);
        alert(`Erro no cadastro: ${err.message}`);
      },
    });
  }
}
