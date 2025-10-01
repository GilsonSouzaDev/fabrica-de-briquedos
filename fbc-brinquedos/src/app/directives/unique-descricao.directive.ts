import { Directive, forwardRef } from '@angular/core';
import {
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BrinquedoApiService } from '../services/brinquedo-api.service';

@Directive({
  selector: '[uniqueDescricao][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueDescricaoDirective),
      multi: true,
    },
  ],
})
export class UniqueDescricaoDirective implements AsyncValidator {
  constructor(private brinquedoService: BrinquedoApiService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) return of(null);

    return this.brinquedoService.getBrinquedos().pipe(
      map((brinquedos) => {
        const existe = brinquedos.some(
          (b) => b.descricao.toLowerCase() === control.value.toLowerCase()
        );
        return existe ? { uniqueDescricao: true } : null;
      }),
      catchError(() => of(null)) // evita quebrar validação se a API falhar
    );
  }
}
