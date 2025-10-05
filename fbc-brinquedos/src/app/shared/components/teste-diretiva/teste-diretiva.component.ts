import { Component, OnInit } from '@angular/core';
import { UsuarioApiService } from '../../../services/usuario-api.service';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-teste-servico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe, // Importar a diretiva aqui
  ],
  template: `
    <div>
      <h3>Teste do Serviço</h3>
      <button (click)="testarGetUsuarios()">Testar getUsuarios()</button>
      <button (click)="testarVerificarEmail()">Testar verificarEmail()</button>
      <div>
        <h4>Resultados:</h4>
        <pre>{{ resultados | json }}</pre>
      </div>
    </div>
  `,
})
export class TesteServicoComponent implements OnInit {
  resultados: any = {};

  constructor(private usuarioService: UsuarioApiService) {}

  ngOnInit() {
    console.log('TesteServicoComponent inicializado');
    console.log('UsuarioApiService:', this.usuarioService);
  }

  testarGetUsuarios() {
    console.log('Testando getUsuarios()...');
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        console.log('getUsuarios() sucesso:', usuarios);
        this.resultados.getUsuarios = {
          sucesso: true,
          dados: usuarios,
          quantidade: usuarios.length,
        };
      },
      error: (erro) => {
        console.error('getUsuarios() erro:', erro);
        this.resultados.getUsuarios = {
          sucesso: false,
          erro: erro.message || erro,
        };
      },
    });
  }

  testarVerificarEmail() {
    const emailTeste = 'teste@exemplo.com';
    console.log(`Testando verificarEmail('${emailTeste}')...`);

    this.usuarioService.verificarEmail(emailTeste).subscribe({
      next: (existe) => {
        console.log('verificarEmail() sucesso:', existe);
        this.resultados.verificarEmail = {
          sucesso: true,
          email: emailTeste,
          existe: existe,
        };
      },
      error: (erro) => {
        console.error('verificarEmail() erro:', erro);
        this.resultados.verificarEmail = {
          sucesso: false,
          email: emailTeste,
          erro: erro.message || erro,
        };
      },
    });
  }
}
