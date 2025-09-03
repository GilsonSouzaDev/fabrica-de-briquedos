import { UserEquipeService } from './../../services/user-equipe.service';
import { UserEquipe } from './../../interfaces/user-equipe';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FbcUserEquipeComponent } from "../../components/fbc-user-equipe/fbc-user-equipe.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fbc-equipe',
  imports: [FbcUserEquipeComponent, CommonModule],
  templateUrl: './fbc-equipe.component.html',
  styleUrl: './fbc-equipe.component.scss',
})
export class FbcEquipeComponent {
  meusUsuarios$!: Observable<UserEquipe[]>;

  constructor(private readonly userEquipeService: UserEquipeService) {}

  ngOnInit() {
    this.meusUsuarios$ = this.userEquipeService.getUserEquipe();
    console.log(this.meusUsuarios$);
  }
}
