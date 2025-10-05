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
  first,
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
    // Não valida se o campo estiver vazio ou não for um e-mail válido
    if (
      !control.value ||
      control.value.trim() === '' ||
      control.hasError('email')
    ) {
      return of(null);
    }

    // Otimização: Espera 300ms após o usuário parar de digitar
    return control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(), // Só dispara se o valor realmente mudou
      first(), // Pega o primeiro valor após o debounce e finaliza
      switchMap((value) =>
        this.usuarioService.verificarEmail(value).pipe(
          map((emailExiste) => (emailExiste ? { uniqueEmail: true } : null)),
          catchError(() => {
            console.error('API para validação de e-mail falhou.');
            return of(null); // Não bloqueia o formulário em caso de erro na API
          })
        )
      )
    );
  }
}
