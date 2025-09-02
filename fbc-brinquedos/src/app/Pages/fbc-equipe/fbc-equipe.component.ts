import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FbcFormComponent } from "../../components/fbc-form/fbc-form.component";
import { FormControl } from '@angular/forms';
import { Brinquedo } from '../../interfaces/brinquedo';
import { FbcUserEquipeComponent } from "../../components/fbc-user-equipe/fbc-user-equipe.component";
import { UserEquipe } from '../../interfaces/user-equipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fbc-equipe',
  imports: [FbcUserEquipeComponent, CommonModule],
  templateUrl: './fbc-equipe.component.html',
  styleUrl: './fbc-equipe.component.scss',
})
export class FbcEquipeComponent {

  meusUsuarios$!: Observable<UserEquipe[]>;
}
