import { Routes } from '@angular/router';
import { FbcHomeComponent } from './Pages/fbc-home/fbc-home.component';
import { FbcEquipeComponent } from './Pages/fbc-equipe/fbc-equipe.component';
import { FbcCatalogComponent } from './Pages/fbc-catalog/fbc-catalog.component';
import { FbcAdminComponent } from './Pages/fbc-admin/fbc-admin.component';

export const routes: Routes = [
  { path: '', component: FbcHomeComponent },
  { path: 'sobre', component: FbcEquipeComponent},
  { path: 'catalogo', component: FbcCatalogComponent },
  { path: 'admin', component: FbcAdminComponent },
];
