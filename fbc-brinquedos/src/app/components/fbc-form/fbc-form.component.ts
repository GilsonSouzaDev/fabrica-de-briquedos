import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brinquedo } from '../../interfaces/brinquedo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fbc-form',
  imports: [FormsModule],
  templateUrl: './fbc-form.component.html',
  styleUrl: './fbc-form.component.scss',
})
export class FbcFormComponent {
  /** Dados iniciais do formulário (edição ou cadastro vazio) */
  @Input() toy: Brinquedo = {
    codigo: 0,
    descricao: '',
    categoria: '',
    marca: '',
    imagem: '',
    valor: 0,
    detalhes: '',
  };

  /** Emite os dados preenchidos quando clicar em salvar */
  @Output() cadastrar = new EventEmitter<Brinquedo>();

  /** Emite quando o formulário for cancelado */
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.cadastrar.emit(this.toy);
  }

  onCancel() {
    this.cancel.emit();
  }
}
