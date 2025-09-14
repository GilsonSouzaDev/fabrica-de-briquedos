// 1. Importações Essenciais
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


// 2. A Função do Guarda
export const authGuard: CanActivateFn = (route, state) => {
  // 3. Injetando dependências
  const authService = inject(AuthService);
  const router = inject(Router);

  // 4. A Lógica de Verificação
  if (authService.currentUserSig()) {
    // 5. Usuário está logado
    return true; // Permite o acesso à rota
  } else {
    // 6. Usuário NÃO está logado
    // Redireciona para a página de login e bloqueia a rota atual
    return router.createUrlTree(['/login']);
  }
};
