import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UniqueEmailDirective } from '../../../directives/unique-email.directive';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-teste-diretiva',
  imports: [UniqueEmailDirective, JsonPipe, FormsModule, ReactiveFormsModule],
  template: `
    <div>
      <h3>Teste da Diretiva</h3>
      <form [formGroup]="testeForm">
        <div>
          <label>Email com diretiva:</label>
          <input
            type="email"
            formControlName="emailComDiretiva"
            uniqueEmail
            placeholder="Digite um email"
          />
        </div>

        <div>
          <label>Email sem diretiva:</label>
          <input
            type="email"
            formControlName="emailSemDiretiva"
            placeholder="Digite um email"
          />
        </div>

        <button type="button" (click)="verificarEstados()">
          Verificar Estados
        </button>
      </form>

      <div>
        <h4>Estados dos Campos:</h4>
        <pre>{{ estadosCampos | json }}</pre>
      </div>

      <div>
        <h4>Erros:</h4>
        <pre>{{ erros | json }}</pre>
      </div>
    </div>
  `,
})
export class TesteDiretivaComponent implements OnInit {
  testeForm: FormGroup;
  estadosCampos: any = {};
  erros: any = {};

  constructor(private fb: FormBuilder) {
    this.testeForm = this.fb.group({
      emailComDiretiva: ['', [Validators.required, Validators.email]],
      emailSemDiretiva: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    console.log('TesteDiretivaComponent inicializado');

    // Monitora mudanças no campo com diretiva
    this.testeForm.get('emailComDiretiva')?.valueChanges.subscribe((value) => {
      console.log('emailComDiretiva mudou:', value);
      setTimeout(() => this.verificarEstados(), 100);
    });

    // Monitora mudanças no status do campo com diretiva
    this.testeForm
      .get('emailComDiretiva')
      ?.statusChanges.subscribe((status) => {
        console.log('emailComDiretiva status mudou:', status);
        setTimeout(() => this.verificarEstados(), 100);
      });
  }

  verificarEstados() {
    const emailComDiretiva = this.testeForm.get('emailComDiretiva');
    const emailSemDiretiva = this.testeForm.get('emailSemDiretiva');

    this.estadosCampos = {
      emailComDiretiva: {
        value: emailComDiretiva?.value,
        valid: emailComDiretiva?.valid,
        invalid: emailComDiretiva?.invalid,
        pending: emailComDiretiva?.pending,
        touched: emailComDiretiva?.touched,
        dirty: emailComDiretiva?.dirty,
        status: emailComDiretiva?.status,
      },
      emailSemDiretiva: {
        value: emailSemDiretiva?.value,
        valid: emailSemDiretiva?.valid,
        invalid: emailSemDiretiva?.invalid,
        pending: emailSemDiretiva?.pending,
        touched: emailSemDiretiva?.touched,
        dirty: emailSemDiretiva?.dirty,
        status: emailSemDiretiva?.status,
      },
    };

    this.erros = {
      emailComDiretiva: emailComDiretiva?.errors,
      emailSemDiretiva: emailSemDiretiva?.errors,
    };

    console.log('Estados atualizados:', this.estadosCampos);
    console.log('Erros atualizados:', this.erros);
  }
}
