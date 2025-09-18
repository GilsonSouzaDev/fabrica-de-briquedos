// src/main.ts
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { AuthApiService } from './app/services/auth-api.service';
import { AuthService } from './app/services/auth.service';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Habilita HttpClient globalmente
    provideClientHydration(), // Habilita SSR hydration
    provideRouter(routes), // Se tiver rotas
    {
      provide: 'IAuthService', // token abstrato para alternar Mock/API
      useClass: environment.useMockAuth ? AuthService : AuthApiService,
    },
  ],
}).catch((err) => console.error(err));
