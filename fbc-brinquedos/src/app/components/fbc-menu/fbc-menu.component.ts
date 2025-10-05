import { Component, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services-mock/auth.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-fbc-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './fbc-menu.component.html',
  styleUrl: './fbc-menu.component.scss',
})
export class FbcMenuComponent {

  public readonly isLoggedIn: Signal<boolean>;

  constructor(private readonly authApiService: AuthApiService) {
    this.isLoggedIn = this.authApiService.isLoggedIn;

  }
}
