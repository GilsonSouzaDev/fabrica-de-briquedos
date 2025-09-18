import { NgOptimizedImage } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { FbcUsermenuComponent } from "../fbc-usermenu/fbc-usermenu.component";
import { AuthService } from '../../services/auth.service';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-fbc-header',
  imports: [NgOptimizedImage, FbcUsermenuComponent],
  templateUrl: './fbc-header.component.html',
  styleUrl: './fbc-header.component.scss',
})
export class FbcHeaderComponent {

  public readonly isLoggedIn: Signal<boolean>;
  public readonly currentUser: Signal<UsuarioAdmin | null>;

  constructor(private readonly authApiService: AuthApiService) {
    this.isLoggedIn = this.authApiService.isLoggedIn;
    this.currentUser = this.authApiService.currentUser;
  }



}
