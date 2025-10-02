// src/app/directives/unique-codigo.directive.ts

import { Directive, forwardRef, Input } from '@angular/core';
import {
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, first } from 'rxjs/operators';
import { BrinquedoApiService } from '../services/brinquedo-api.service';
import { Brinquedo } from '../interfaces/brinquedo';

@Directive({
  // O seletor agora é mais específico para evitar ambiguidades.
  selector: 'input[uniqueCodigo]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueCodigoDirective),
      multi: true,
    },
  ],
  // Adicionado para garantir que a diretiva seja standalone, como o componente que a usa.
  standalone: true,
})
export class UniqueCodigoDirective implements AsyncValidator {
  // O nome do @Input foi alterado para 'idBrinquedo' para ser claro e distinto do seletor.
  @Input('idBrinquedo') currentId?: number;

  constructor(private brinquedoService: BrinquedoApiService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    // Converte o valor do campo para número. Se for inválido ou vazio, não valida.
    const codigoValue = +control.value;
    if (!codigoValue) {
      return of(null);
    }

    return this.brinquedoService.getBrinquedos().pipe(
      map((brinquedos: Brinquedo[]) => {
        // Procura por um brinquedo que tenha o mesmo código.
        const conflito = brinquedos.find((b) => +b.codigo === codigoValue);

        // Se não encontrou nenhum brinquedo com esse código, está válido.
        if (!conflito) {
          return null;
        }

        // Se encontrou, verifica se o ID do brinquedo encontrado é o mesmo do que estamos editando.
        // Se for, significa que é o próprio item, então não é um erro de duplicidade.
        if (this.currentId && conflito.id === this.currentId) {
          return null;
        }

        // Se o conflito existe e não é o item atual, retorna o erro de validação.
        return { uniqueCodigo: true };
      }),
      // 'first()' é crucial: garante que o observable complete após a primeira emissão.
      first(),
      // 'catchError' previne que o formulário quebre se a chamada à API falhar.
      catchError(() => {
        console.error('API para validação de código falhou.');
        return of(null); // Retorna 'null' para indicar que a validação passou (não bloqueante).
      })
    );
  }
}
