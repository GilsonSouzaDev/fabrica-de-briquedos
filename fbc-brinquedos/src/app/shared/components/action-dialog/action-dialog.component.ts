import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';

// Interfaces
export interface ActionDialogData {
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  action: () => Promise<any> | import('rxjs').Observable<any>;
}

export interface ResultStateData {
  success: boolean;
  title: string;
  message: string;
}





@Component({
  selector: 'app-action-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss'],
})
export class ActionDialogComponent {
  public state: 'confirmation' | 'loading' | 'result' = 'confirmation';
  public resultData: ResultStateData | null = null;

  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionDialogData
  ) {}

  public async onConfirm(): Promise<void> {
    this.state = 'loading';
    this.dialogRef.disableClose = true;

    try {
      const actionToExecute = this.data.action();
      await (actionToExecute instanceof Promise
        ? actionToExecute
        : firstValueFrom(actionToExecute));

      this.resultData = {
        success: true,
        title: 'Sucesso!',
        message: 'A operação foi realizada com êxito.',
      };
    } catch (error: any) {
      //console.error('Falha na ação do diálogo:', error);

      const errorMessage =
        error?.error?.error ||
        error?.error?.message ||
        (typeof error?.error === 'string' ? error.error : null) ||
        error?.message ||
        'Não foi possível completar a operação. Tente novamente.';

      this.resultData = {
        success: false,
        title: 'Ocorreu um Erro',
        message: errorMessage,
      };
    } finally {
      this.state = 'result';
      this.dialogRef.disableClose = false;
    }
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public closeDialog(): void {
    this.dialogRef.close(this.resultData?.success);
  }
}
