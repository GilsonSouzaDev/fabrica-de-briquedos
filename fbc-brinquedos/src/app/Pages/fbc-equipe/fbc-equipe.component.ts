import { Component } from '@angular/core';
import { FbcFormComponent } from "../../components/fbc-form/fbc-form.component";
import { FormControl } from '@angular/forms';
import { Brinquedo } from '../../interfaces/brinquedo';

@Component({
  selector: 'app-fbc-equipe',
  imports: [FbcFormComponent],
  templateUrl: './fbc-equipe.component.html',
  styleUrl: './fbc-equipe.component.scss',
})
export class FbcEquipeComponent {


  onCadastro(form: Brinquedo){
      console.log(form)
  }


}
