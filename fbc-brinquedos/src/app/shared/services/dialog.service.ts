import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ActionDialogData,
  ActionDialogComponent,
} from '../components/action-dialog/action-dialog.component';
import { AlertDialogComponent, AlertDialogData } from '../components/alert-dialog/alert-dialog.component';

export interface ConfirmActionOptions extends Partial<ActionDialogData> {
  action: () => Promise<any> | import('rxjs').Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Abre um diálogo de confirmação que executa uma ação, mostrando estados de loading e resultado.
   * @param options As configurações para o diálogo. A propriedade 'action' é obrigatória.
   * @returns A referência do diálogo (MatDialogRef) para que o chamador possa reagir ao fechamento.
   */
  public confirmAction(
    options: ConfirmActionOptions
  ): MatDialogRef<ActionDialogComponent, boolean> {
    // Define valores padrão para os textos, que podem ser sobrescritos pelos 'options'
    const defaultData: ActionDialogData = {
      title: 'Confirmar Ação',
      message: 'Você tem certeza que deseja prosseguir com esta ação?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      action: options.action, // A ação é passada diretamente
    };

    // Mescla os padrões com as opções fornecidas pelo usuário
    const dialogData: ActionDialogData = { ...defaultData, ...options };

    // Abre o componente de diálogo com os dados e configurações
    return this.dialog.open<ActionDialogComponent, ActionDialogData, boolean>(
      ActionDialogComponent,
      {
        width: '450px',
        data: dialogData,
        disableClose: true, // Impede o fechamento clicando fora ou pressionando ESC no estado inicial
      }
    );
  }

  public alert(data: AlertDialogData): MatDialogRef<AlertDialogComponent> {
    return this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: data,
      disableClose: true,
    });
  }
}
