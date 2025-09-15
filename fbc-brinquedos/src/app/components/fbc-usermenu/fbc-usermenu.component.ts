import { Component, OnInit, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';

@Component({
  selector: 'app-fbc-usermenu',
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './fbc-usermenu.component.html',
  styleUrl: './fbc-usermenu.component.scss',
})
export class FbcUsermenuComponent {
  public readonly isLoggedIn: Signal<boolean>;
  public readonly currentUser: Signal<UsuarioAdmin | null>;

  constructor(private readonly authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUser = this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }
}
