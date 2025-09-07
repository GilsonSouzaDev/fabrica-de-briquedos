import { Component, Output, EventEmitter } from '@angular/core';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fbc-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './fbc-login.component.html',
  styleUrl: './fbc-login.component.scss'
})
export class FbcLoginComponent {

  usuarioAdmin: UsuarioAdmin = {} as UsuarioAdmin;

  @Output() userAdmin = new EventEmitter<UsuarioAdmin>();

  onSubmit() {
    this.userAdmin.emit(this.usuarioAdmin);
  }



}
