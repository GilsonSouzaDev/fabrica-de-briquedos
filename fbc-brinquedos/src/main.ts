import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { register } from 'swiper/element/bundle';

// 2. Execute a função para registrar os elementos globalmente
register();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
