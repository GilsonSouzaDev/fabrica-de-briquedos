
import { Component, Input} from '@angular/core';
import { Brinquedo } from '../../interfaces/brinquedo';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RealPipe } from "../../pipes/real.pipe";

@Component({
  selector: 'app-fbc-card',
  imports: [CommonModule, RealPipe],
  templateUrl: './fbc-card.component.html',
  styleUrl: './fbc-card.component.scss',
})
export class FbcCardComponent {
  constructor(private router: Router) {}

  @Input() brinquedo!: Brinquedo;

  onClicked() {
    this.router.navigate(['/detalhes'], {
      state: { brinquedo: this.brinquedo },
    });
  }
}
