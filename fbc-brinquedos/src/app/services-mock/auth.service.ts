// 1. Importações Essenciais (sem mudanças)
import { Injectable, signal, WritableSignal, effect, Signal, computed } from '@angular/core'; // 1. Adicione 'effect'
import { Router } from '@angular/router';
import { UsuarioAdmin } from '../interfaces/usuario-admin';
import { LISTA_DE_USUARIOS } from '../data/usuarios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // O Signal continua sendo a fonte reativa para a UI
  public currentUserSig: WritableSignal<UsuarioAdmin | null | undefined> =
    signal(undefined);

  // 2. O Construtor agora inicializa o estado
  constructor(private router: Router) {
    // 3. Lógica para carregar o estado do localStorage na inicialização
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      // Se encontrou um usuário no localStorage, atualiza o signal
      this.currentUserSig.set(JSON.parse(storedUser));
    } else {
      // Se não, o estado inicial é 'null' (ninguém logado)
      this.currentUserSig.set(null);
    }

    // Usando 'effect' para sincronizar
    // Este 'effect' vai rodar sempre que o currentUserSig mudar.
    effect(() => {
      const user = this.currentUserSig();
      if (user) {
        // Se o usuário logou (signal tem um usuário), salva no localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        // Se o usuário deslogou (signal é null), remove do localStorage
        localStorage.removeItem('currentUser');
      }
    });
  }

  // 5. O Método de Login (agora mais simples)
  login(dadosLogin: { email: string; senha: string }): boolean {
    const usuarioEncontrado = LISTA_DE_USUARIOS.find(
      (user) =>
        user.userEmail === dadosLogin.email &&
        user.userSenha === dadosLogin.senha
    );

    if (usuarioEncontrado) {
      // Sucesso: Apenas atualiza o signal. O 'effect' cuidará do localStorage.
      this.currentUserSig.set(usuarioEncontrado);
      return true;
    } else {
      // Falha: Apenas atualiza o signal. O 'effect' cuidará do localStorage.
      this.currentUserSig.set(null);
      return false;
    }
  }

  // 6. O Método de Logout (também mais simples)
  logout(): void {
    // Apenas atualiza o signal. O 'effect' cuidará de limpar o localStorage.
    this.currentUserSig.set(null);
    this.router.navigate(['/login']);
  }


  // ==================================================================
  // 2. SIGNALS PÚBLICOS E DE LEITURA (para serem consumidos por componentes)
  // ==================================================================

  /** Signal público que expõe o usuário atual. Os componentes podem "ouvir" este signal. */
  public readonly currentUser: Signal<UsuarioAdmin | null> = computed(
    () => this.currentUserSig() ?? null
  );

  /** Signal público que expõe o estado de login como um booleano. Perfeito para *ngIf. */
  public readonly isLoggedIn: Signal<boolean> = computed(
    () => !!this.currentUserSig()
  );

  // ==================================================================
  // 8. (NOVO) Método GET para buscar usuário pelo nome
  // ==================================================================
  /**
   * Busca um usuário na lista de dados mockados pelo nome.
   * @param nome O nome do usuário a ser procurado. A busca não diferencia maiúsculas/minúsculas.
   * @returns O objeto UsuarioAdmin se encontrado, ou undefined se não houver correspondência.
   */
  getUserByName(nome: string): UsuarioAdmin | undefined {
    // Normaliza o nome de busca para minúsculas para uma comparação case-insensitive
    const nomeBusca = nome.toLowerCase();

    // Usa o método find() para procurar o usuário na lista
    const usuarioEncontrado = LISTA_DE_USUARIOS.find(
      (user) => user.nome.toLowerCase() === nomeBusca
    );

    // Retorna o usuário encontrado ou undefined se não encontrou
    return usuarioEncontrado;
  }
}
