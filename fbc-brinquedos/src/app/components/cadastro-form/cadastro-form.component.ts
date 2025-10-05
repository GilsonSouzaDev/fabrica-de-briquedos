import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';


// Tipo para os dados emitidos, omitindo a confirmação de senha
export type CadastroFormValue = Omit<UsuarioAdmin, 'id_usuario'>;

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.scss'],
})
export class CadastroFormComponent implements OnInit {
  // Evento que será emitido para o componente pai (smart) com os dados do formulário
  @Output() formSubmit = new EventEmitter<CadastroFormValue>();

  cadastroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        userEmail: ['', [Validators.required, Validators.email]],
        userSenha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required],
      },
      {
        validator: this.senhasCoincidem,
      }
    );
  }

  senhasCoincidem(group: FormGroup) {
    const senha = group.get('userSenha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasNaoCoincidem: true };
  }

  // Método para lidar com o envio do formulário
  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    // Prepara o objeto para ser emitido, sem o campo de confirmação
    const formValue: CadastroFormValue = {
      nome: this.cadastroForm.value.nome,
      userEmail: this.cadastroForm.value.userEmail,
      userSenha: this.cadastroForm.value.userSenha,
    };

    // Emite o evento com os dados para o componente pai
    this.formSubmit.emit(formValue);
  }
}
