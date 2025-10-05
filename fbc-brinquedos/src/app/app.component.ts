// Importações principais do Angular e dos seus componentes
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, Scroll } from '@angular/router';
import { FbcHeaderComponent } from './components/fbc-header/fbc-header.component';
import { FbcMenuComponent } from './components/fbc-menu/fbc-menu.component';
import { FbcFooterComponent } from './components/fbc-footer/fbc-footer.component';

// Swiper
import { register } from 'swiper/element/bundle';
import { filter, skip } from 'rxjs/operators';
import { SearchService } from './shared/services/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
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
export class AppComponent implements OnInit {
  title = 'fbc-brinquedos';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Inicializa Swiper somente no browser
      register();

      // Força scroll para o topo a cada mudança de rota
      this.router.events
        .pipe(filter((e): e is Scroll => e instanceof Scroll))
        .subscribe(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        });
    }
  }

  private searchService = inject(SearchService);

  ngOnInit(): void {
    this.searchService.searchTerm$
      .pipe(
        skip(1),
        filter((term) => !!term.trim()),
        filter(() => !this.router.url.includes('/pesquisa'))
      )
      .subscribe(() => {
        this.router.navigate(['/pesquisa']);
      });
  }
}
