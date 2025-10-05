import { Component, Output, EventEmitter } from '@angular/core';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-fbc-login',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './fbc-login.component.html',
  styleUrl: './fbc-login.component.scss',
})
export class FbcLoginComponent {
  usuarioAdmin: UsuarioAdmin = {} as UsuarioAdmin;

  @Output() userAdmin = new EventEmitter<UsuarioAdmin>();

  onSubmit() {
    this.userAdmin.emit(this.usuarioAdmin);
  }
}
