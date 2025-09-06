// Importações principais do Angular e dos seus componentes
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FbcHeaderComponent } from './components/fbc-header/fbc-header.component';
import { FbcMenuComponent } from './components/fbc-menu/fbc-menu.component';
import { FbcFooterComponent } from './components/fbc-footer/fbc-footer.component';

// Importações para a solução do SSR (Server-Side Rendering)
import { isPlatformBrowser } from '@angular/common';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-root',
  standalone: true, // Adicionei 'standalone: true' pois seus imports sugerem isso
  imports: [
    CommonModule,
    RouterOutlet,
    FbcHeaderComponent,
    FbcMenuComponent,
    FbcFooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fbc-brinquedos';

  // O construtor agora injeta o PLATFORM_ID para detectar o ambiente
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // A inicialização do Swiper agora está protegida.
    // Ela só será executada quando o código estiver rodando no navegador.
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
  }
}
