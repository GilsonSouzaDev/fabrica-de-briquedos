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
  selector: 'input[uniqueCodigo]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueCodigoDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class UniqueCodigoDirective implements AsyncValidator {
  @Input('idBrinquedo') currentId?: number;

  constructor(private brinquedoService: BrinquedoApiService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const codigoValue = +control.value;
    if (!codigoValue) {
      return of(null);
    }

    return this.brinquedoService.getBrinquedos().pipe(
      map((brinquedos: Brinquedo[]) => {
        const conflito = brinquedos.find((b) => +b.codigo === codigoValue);
        if (!conflito) {
          return null;
        }
        if (this.currentId && conflito.id === this.currentId) {
          return null;
        }
        return { uniqueCodigo: true };
      }),
      first(),
      catchError(() => {
        console.error('API para validação de código falhou.');
        return of(null);
      })
    );
  }
}
