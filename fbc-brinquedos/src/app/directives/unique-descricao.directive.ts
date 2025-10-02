// src/app/directives/unique-descricao.directive.ts

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
  selector: 'input[uniqueDescricao]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueDescricaoDirective),
      multi: true,
    },
  ],
  // Adicionado para garantir que a diretiva seja standalone, como o componente que a usa.
  standalone: true,
})
export class UniqueDescricaoDirective implements AsyncValidator {
  // O nome do @Input foi alterado para 'idBrinquedo' para ser consistente e claro.
  @Input('idBrinquedo') currentId?: number;

  constructor(private brinquedoService: BrinquedoApiService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    // Se o campo estiver vazio ou só com espaços, não valida.
    if (!control.value || control.value.trim() === '') {
      return of(null);
    }

    const descricaoValue = control.value.toLowerCase();

    return this.brinquedoService.getBrinquedos().pipe(
      map((brinquedos: Brinquedo[]) => {
        // Procura por um brinquedo que tenha a mesma descrição (ignorando maiúsculas/minúsculas).
        const conflito = brinquedos.find(
          (b) => b.descricao.toLowerCase() === descricaoValue
        );

        // Se não encontrou nenhum brinquedo com essa descrição, está válido.
        if (!conflito) {
          return null;
        }

        // Se encontrou, verifica se o ID do brinquedo encontrado é o mesmo do que estamos editando.
        if (this.currentId && conflito.id === this.currentId) {
          return null;
        }

        // Se o conflito existe e não é o item atual, retorna o erro de validação.
        return { uniqueDescricao: true };
      }),
      // 'first()' garante que o observable complete.
      first(),
      // 'catchError' previne que o formulário quebre se a chamada à API falhar.
      catchError(() => {
        console.error('API para validação de descrição falhou.');
        return of(null);
      })
    );
  }
}
