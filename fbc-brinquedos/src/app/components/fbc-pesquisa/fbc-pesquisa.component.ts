import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-fbc-pesquisa',
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './fbc-pesquisa.component.html',
  styleUrl: './fbc-pesquisa.component.scss',
})
export class FbcPesquisaComponent {
  query: string = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.query);
  }

  clear() {
    this.query = '';
    this.search.emit(this.query);
  }
}
