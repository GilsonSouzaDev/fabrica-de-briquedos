import { Component } from '@angular/core';
import { Brinquedo } from '../../interfaces/brinquedo';
import { FbcCardComponent } from "../fbc-card/fbc-card.component";

@Component({
  selector: 'app-fbc-home',
  imports: [FbcCardComponent],
  templateUrl: './fbc-home.component.html',
  styleUrl: './fbc-home.component.scss',
})
export class FbcHomeComponent {
  items = new Array(5)
}
