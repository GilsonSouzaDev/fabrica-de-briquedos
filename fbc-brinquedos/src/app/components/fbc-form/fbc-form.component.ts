// components/fbc-form/fbc-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Brinquedo } from '../../interfaces/brinquedo';
import { Categoria } from '../../interfaces/categoria';
import { CATEGORIAS } from '../../data/categoria';
import { UniqueCodigoDirective } from '../../directives/unique-codigo.directive';
import { UniqueDescricaoDirective } from '../../directives/unique-descricao.directive';

type FormMode = 'create' | 'edit';

@Component({
  selector: 'app-fbc-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UniqueCodigoDirective,
    UniqueDescricaoDirective

  ],
  templateUrl: './fbc-form.component.html',
  styleUrl: './fbc-form.component.scss',
})
export class FbcFormComponent {
  @Input() mode: FormMode = 'create';
  @Input() toy: Brinquedo = {
    id: 0,
    codigo: 0,
    descricao: '',
    categoria: '',
    marca: '',
    imagem: '',
    valor: 0,
    detalhes: '',
    quantVendas: 0,
  };

  @Output() save = new EventEmitter<Brinquedo>();
  @Output() cancel = new EventEmitter<void>();

  categorias: Categoria[] = CATEGORIAS;

  get isEdit(): boolean {
    return this.mode === 'edit';
  }

  onSubmit() {
    this.save.emit(this.toy);
  }
  onCancel() {
    this.cancel.emit();
  }
}
