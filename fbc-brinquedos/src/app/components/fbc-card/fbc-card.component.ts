import { Component, Input } from '@angular/core';
import { Brinquedo } from '../../interfaces/brinquedo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fbc-card',
  imports: [CommonModule],
  templateUrl: './fbc-card.component.html',
  styleUrl: './fbc-card.component.scss',
})
export class FbcCardComponent {

  @Input() brinquedo!: Brinquedo;

  onClicked(){
    console.log('clicou');
  }


}
