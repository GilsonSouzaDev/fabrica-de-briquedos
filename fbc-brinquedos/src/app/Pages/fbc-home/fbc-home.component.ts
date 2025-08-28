import { Brinquedo } from '../../interfaces/brinquedo';
import { Component } from '@angular/core';
import { FbcCardComponent } from "../../components/fbc-card/fbc-card.component";
import { BrinquedoService } from '../../services/brinquedo.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fbc-home',
  imports: [FbcCardComponent, CommonModule],
  templateUrl: './fbc-home.component.html',
  styleUrl: './fbc-home.component.scss',
})
export class FbcHomeComponent {
  items = new Array(5);

  destaques$!: Observable<Brinquedo[]>;

  constructor(private brinquedoService: BrinquedoService) {}

  ngOnInit(): void {
    // A chamada ficou mais simples e sem "números mágicos".
    // O componente não precisa saber que são 8, ele apenas confia no serviço.
    this.destaques$ = this.brinquedoService.getBrinquedosDestaque();
  }
}
