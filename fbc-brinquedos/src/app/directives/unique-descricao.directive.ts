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
  selector: 'input[uniqueDescricao]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueDescricaoDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class UniqueDescricaoDirective implements AsyncValidator {
  @Input('idBrinquedo') currentId?: number;

  constructor(private brinquedoService: BrinquedoApiService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value || control.value.trim() === '') {
      return of(null);
    }

    const descricaoValue = control.value.toLowerCase();

    return this.brinquedoService.getBrinquedos().pipe(
      map((brinquedos: Brinquedo[]) => {
        const conflito = brinquedos.find(
          (b) => b.descricao.toLowerCase() === descricaoValue
        );
        if (!conflito) {
          return null;
        }
        if (this.currentId && conflito.id === this.currentId) {
          return null;
        }
        return { uniqueDescricao: true };
      }),
      first(),
      catchError(() => {
        console.error('API para validação de descrição falhou.');
        return of(null);
      })
    );
  }
}
