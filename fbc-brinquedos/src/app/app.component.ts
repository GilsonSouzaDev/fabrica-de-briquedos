import { Component } from '@angular/core';
import { FbcHeaderComponent } from "./components/fbc-header/fbc-header.component";
import { FbcMenuComponent } from "./components/fbc-menu/fbc-menu.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TitleService } from './services/title.service';
import { extractRouteTitle } from './utils/title.utils';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [FbcHeaderComponent, FbcMenuComponent, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fbc-brinquedos';

  mainTitle = '';
  subTitle = '';

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: TitleService
  ) {
    // Atualiza título principal
    router.events.subscribe(() => {
      titleService.setMainTitle(extractRouteTitle(route));
    });

    // Ligações reativas (sem lógica pesada)
    titleService.mainTitle.subscribe((t) => (this.mainTitle = t));
    titleService.subTitle.subscribe((t) => (this.subTitle = t));
  }
}
