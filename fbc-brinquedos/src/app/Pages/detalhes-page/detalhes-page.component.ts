import { Component } from '@angular/core';
import { Brinquedo } from '../../interfaces/brinquedo';
import { Router } from '@angular/router';
import { FbcDetalhesComponent } from "../../components/fbc-detalhes/fbc-detalhes.component";

@Component({
  selector: 'app-detalhes-page',
  imports: [FbcDetalhesComponent],
  templateUrl: './detalhes-page.component.html',
  styleUrl: './detalhes-page.component.scss',
})
export class DetalhesPageComponent {

  brinquedo!: Brinquedo;

  constructor(private router: Router) {
    // Recupera os dados do state
    const navigation = this.router.getCurrentNavigation();
    this.brinquedo = navigation?.extras.state?.['brinquedo'];
    console.log(this.brinquedo);
  }

  ngOnInit() {
    if (!this.brinquedo) {
      // Caso o usuário acesse a URL diretamente sem state
      this.router.navigate(['/']); // ou outra rota
    }
  }
}
