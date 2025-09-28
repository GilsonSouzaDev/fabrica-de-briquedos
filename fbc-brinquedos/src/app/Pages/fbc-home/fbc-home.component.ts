import { Brinquedo } from '../../interfaces/brinquedo';
import { Component, OnInit } from '@angular/core';
import { FbcCardComponent } from "../../components/fbc-card/fbc-card.component";
//import { BrinquedoService } from '../../services/brinquedo.service';
import { map, Observable } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FbcBannerComponent } from "../../components/fbc-banner/fbc-banner.component";
import { BrinquedoApiService } from '../../services/brinquedo-api.service';

@Component({
  selector: 'app-fbc-home',
  imports: [FbcCardComponent, CommonModule, FbcBannerComponent],
  templateUrl: './fbc-home.component.html',
  styleUrl: './fbc-home.component.scss',
})
export class FbcHomeComponent implements OnInit {

  destaques$!: Observable<Brinquedo[]>;

  constructor(private brinquedoService: BrinquedoApiService) {}

  ngOnInit(): void {
    this.destaques$ = this.brinquedoService.getBrinquedosDestaque().pipe(
      map(brinquedos => brinquedos.slice(0, 4))
    );
  }

}

function limitarListaDeObjetos<T>(lista: T[], limite: number): T[] {
  return lista.slice(0, limite);
}
