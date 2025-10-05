import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { AuthApiService } from './app/services/auth-api.service';
import { AuthService } from './app/services-mock/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // volta para o topo sempre
      })
    ),
    {
      provide: 'IAuthService',
      useClass: environment.useMockAuth ? AuthService : AuthApiService,
    },
  ],
}).catch((err) => console.error(err));
