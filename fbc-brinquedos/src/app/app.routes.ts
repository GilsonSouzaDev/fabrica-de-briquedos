import { Routes } from '@angular/router';
import { FbcHomeComponent } from './Pages/fbc-home/fbc-home.component';
import { FbcEquipeComponent } from './Pages/fbc-equipe/fbc-equipe.component';
import { FbcCatalogComponent } from './Pages/fbc-catalog/fbc-catalog.component';

export const routes: Routes = [
  { path: '', component: FbcHomeComponent, data: { title: 'Brinquedos em Destaque' } },
  { path: 'sobre', component: FbcEquipeComponent, data: {title: 'Team Page'} },
  { path: 'catalogo', component: FbcCatalogComponent, data: {title: 'Catalogo de Brinquedos'} },
];
