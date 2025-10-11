import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { BrinquedoApiService } from './brinquedo-api.service'; // Importa o serviço existente

@Injectable({
  providedIn: 'root',
})
export class AppStatusService {
  private backendActiveSubject = new BehaviorSubject<boolean>(false);
  public backendActive$ = this.backendActiveSubject.asObservable();

  private keepAliveSubscription: Subscription | undefined;
  private dataCheckSubscription: Subscription | undefined;

  constructor(private brinquedoApiService: BrinquedoApiService) {}

  /**
   * Inicia a verificação inicial de dados e configura o monitoramento se necessário.
   */
  initializeDataCheck(): void {
    this.brinquedoApiService
      .getBrinquedos()
      .pipe(
        catchError((error) => {
          console.error('Erro inicial ao verificar dados:', error);
          return of([]); // Retorna array vazio em caso de erro
        })
      )
      .subscribe((data) => {
        const hasData = data && data.length > 0;
        this.backendActiveSubject.next(hasData);

        if (!hasData) {
          console.log(
            'Backend inativo ou sem dados. Iniciando monitoramento e keep-alive.'
          );
          this.startKeepAliveAndMonitoring();
        } else {
          console.log('Backend ativo e com dados.');
        }
      });
  }

  /**
   * Inicia o sistema de keep-alive e monitoramento contínuo do backend.
   */
  private startKeepAliveAndMonitoring(): void {
    // Para garantir que não há assinaturas duplicadas
    this.stopMonitoring();

    // Keep-alive: Chama getBrinquedos() a cada 5 segundos para manter o backend ativo.
    // A resposta é ignorada, o objetivo é apenas fazer a requisição.
    this.keepAliveSubscription = interval(5000)
      .pipe(
        switchMap(() =>
          this.brinquedoApiService.getBrinquedos().pipe(
            catchError((error) => {
              console.log(
                'Keep-alive: Erro ao chamar getBrinquedos. Tentando novamente...',
                error
              );
              return of([]); // Continua tentando mesmo com erro
            })
          )
        ),
        tap(() =>
          console.log('Keep-alive: Requisição getBrinquedos() enviada.')
        )
      )
      .subscribe();

    // Verificação de dados: Chama getBrinquedos() a cada 3 segundos para verificar a disponibilidade de dados.
    this.dataCheckSubscription = interval(3000)
      .pipe(
        switchMap(() =>
          this.brinquedoApiService.getBrinquedos().pipe(
            catchError((error) => {
              console.error(
                'Verificação de dados: Erro ao chamar getBrinquedos:',
                error
              );
              return of([]); // Retorna array vazio em caso de erro
            })
          )
        )
      )
      .subscribe((data) => {
        const hasData = data && data.length > 0;
        if (hasData) {
          console.log(
            'Verificação de dados: Dados disponíveis. Parando monitoramento.'
          );
          this.backendActiveSubject.next(true);
          this.stopMonitoring(); // Para o monitoramento quando os dados estiverem disponíveis
        }
      });
  }

  /**
   * Para o monitoramento do backend (keep-alive e verificação de dados).
   */
  private stopMonitoring(): void {
    if (this.keepAliveSubscription) {
      this.keepAliveSubscription.unsubscribe();
      this.keepAliveSubscription = undefined;
      console.log('Keep-alive subscription unsubscribed.');
    }
    if (this.dataCheckSubscription) {
      this.dataCheckSubscription.unsubscribe();
      this.dataCheckSubscription = undefined;
      console.log('Data check subscription unsubscribed.');
    }
  }
}
