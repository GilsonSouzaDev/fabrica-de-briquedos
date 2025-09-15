import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fbc-menu',
  imports: [RouterLink],
  templateUrl: './fbc-menu.component.html',
  styleUrl: './fbc-menu.component.scss',
})
export class FbcMenuComponent {

  public readonly isLoggedIn: Signal<boolean>;

  constructor(private readonly authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn;

  }
}
