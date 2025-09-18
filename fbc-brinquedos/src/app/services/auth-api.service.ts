import {
  Injectable,
  signal,
  WritableSignal,
  effect,
  Signal,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioAdmin } from '../interfaces/usuario-admin';
import { environment } from '../../environments/environment';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public currentUserSig: WritableSignal<UsuarioAdmin | null | undefined> =
    signal(undefined);

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSig.set(JSON.parse(storedUser));
    } else {
      this.currentUserSig.set(null);
    }

    // Sempre sincroniza sinal com localStorage
    effect(() => {
      const user = this.currentUserSig();
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    });
  }

  // 🔹 login com Observable
  login(dadosLogin: { email: string; senha: string }): Observable<boolean> {
    return this.http
      .post<UsuarioAdmin>(`${environment.apiUrl}/usuario/login`, {
        userEmail: dadosLogin.email,
        userSenha: dadosLogin.senha,
      })
      .pipe(
        map((usuario) => {
          if (usuario) {
            this.currentUserSig.set(usuario);
            return true;
          } else {
            this.currentUserSig.set(null);
            return false;
          }
        }),
        catchError(() => {
          this.currentUserSig.set(null);
          return of(false);
        })
      );
  }

  logout(): void {
    this.currentUserSig.set(null);
    this.router.navigate(['/login']);
  }

  public readonly currentUser: Signal<UsuarioAdmin | null> = computed(
    () => this.currentUserSig() ?? null
  );

  public readonly isLoggedIn: Signal<boolean> = computed(
    () => !!this.currentUserSig()
  );
}
