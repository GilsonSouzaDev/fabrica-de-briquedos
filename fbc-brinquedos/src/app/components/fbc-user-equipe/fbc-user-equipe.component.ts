import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserEquipe } from '../../interfaces/user-equipe';

@Component({
  selector: 'app-fbc-user-equipe',
  imports: [CommonModule],
  templateUrl: './fbc-user-equipe.component.html',
  styleUrl: './fbc-user-equipe.component.scss',
})
export class FbcUserEquipeComponent {

  @Input() equipe!: UserEquipe;
}
