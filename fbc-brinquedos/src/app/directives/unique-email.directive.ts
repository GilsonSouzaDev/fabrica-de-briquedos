import { Directive, forwardRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { UsuarioApiService } from '../services/usuario-api.service';

@Directive({
  selector: 'input[uniqueEmail]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEmailDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class UniqueEmailDirective implements AsyncValidator {
  constructor(private usuarioService: UsuarioApiService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (
      !control.value ||
      control.value.trim() === '' ||
      control.hasError('email')
    ) {
      return of(null);
    }

    return of(control.value).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) =>
        this.usuarioService.verificarEmail(value).pipe(
          map((emailExiste) => (emailExiste ? { uniqueEmail: true } : null)),
          catchError(() => {
            console.error('API para validação de e-mail falhou.');
            return of(null);
          })
        )
      )
    );
  }
}
