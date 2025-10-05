import { Component, OnInit, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services-mock/auth.service';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { AuthApiService } from '../../services/auth-api.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-fbc-usermenu',
  imports: [MatIconModule, MatMenuModule, MatButtonModule, MatDividerModule],
  templateUrl: './fbc-usermenu.component.html',
  styleUrl: './fbc-usermenu.component.scss',
})
export class FbcUsermenuComponent {
  public readonly isLoggedIn: Signal<boolean>;
  public readonly currentUser: Signal<UsuarioAdmin | null>;

  constructor(private readonly authApiService: AuthApiService) {
    this.isLoggedIn = this.authApiService.isLoggedIn;
    this.currentUser = this.authApiService.currentUser;
  }

  logout(): void {
    this.authApiService.logout();
  }
}
