import { Component, Input } from '@angular/core';
import { Brinquedo } from '../../interfaces/brinquedo';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RealPipe } from "../../pipes/real.pipe";


@Component({
  selector: 'app-fbc-detalhes',
  imports: [CommonModule, RouterLink, RealPipe],
  templateUrl: './fbc-detalhes.component.html',
  styleUrl: './fbc-detalhes.component.scss'
})
export class FbcDetalhesComponent {

  @Input() brinquedoDetalhe!: Brinquedo;



}
