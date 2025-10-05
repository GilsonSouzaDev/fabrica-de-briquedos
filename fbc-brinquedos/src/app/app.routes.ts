import { CadastroUsuarioPageComponent } from './Pages/cadastro-usuario-page/cadastro-usuario-page.component';
import { Routes } from '@angular/router';
import { FbcHomeComponent } from './Pages/fbc-home/fbc-home.component';
import { FbcEquipeComponent } from './Pages/fbc-equipe/fbc-equipe.component';
import { FbcCatalogComponent } from './Pages/fbc-catalog/fbc-catalog.component';
import { FbcAdminComponent } from './Pages/fbc-admin/fbc-admin.component';
import { DetalhesPageComponent } from './Pages/detalhes-page/detalhes-page.component';
import { FbcLoginpageComponent } from './Pages/fbc-loginpage/fbc-loginpage.component';
import { authGuard } from './core/auth.guard';
import { PesquisaPageComponent } from './Pages/pesquisa-page/pesquisa-page.component';

export const routes: Routes = [
  { path: '', component: FbcHomeComponent },
  { path: 'sobre', component: FbcEquipeComponent },
  { path: 'catalogo', component: FbcCatalogComponent },
  { path: 'admin', component: FbcAdminComponent, canActivate: [authGuard] },
  { path: 'detalhes', component: DetalhesPageComponent },
  { path: 'login', component: FbcLoginpageComponent },
  { path: 'pesquisa', component: PesquisaPageComponent },
  { path: 'cadastro', component: CadastroUsuarioPageComponent},


];
