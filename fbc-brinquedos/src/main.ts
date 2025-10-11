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
import { BrinquedoApiService } from './app/services/brinquedo-api.service'; // Importar o serviço existente

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
      // Prover o BrinquedoApiService para que o AppStatusService possa utilizá-lo
      provide: BrinquedoApiService,
      useClass: BrinquedoApiService,
    },
    {
      // Lógica de autenticação existente
      provide: 'IAuthService',
      useClass: environment.useMockAuth ? AuthService : AuthApiService,
    },
    // outros providers existentes...
  ],
}).catch((err) => console.error(err));
