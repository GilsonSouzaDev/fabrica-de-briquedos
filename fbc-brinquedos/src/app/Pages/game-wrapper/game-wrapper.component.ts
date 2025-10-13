import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss'],
})
export class GameWrapperComponent implements OnInit, OnDestroy {
  // URL do jogo Bouncemasters, sanitizada para segurança
  gameUrl: SafeResourceUrl;
  private rawGameUrl = 'http://slither.com/io';

  constructor(private sanitizer: DomSanitizer) {
    this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.rawGameUrl
    );
  }

  ngOnInit(): void {
    console.log(
      'GameWrapperComponent: Jogo carregado. Backend em processo de ativação.'
    );
  }

  ngOnDestroy(): void {
    console.log('GameWrapperComponent: Jogo removido. Backend ativo.');
  }
}
