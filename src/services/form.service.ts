import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../components/confirmation/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class FormService {
    
  constructor(
      private matDialog: MatDialog,
      private snackBar: MatSnackBar
  ) { }

  openMessageDialog(title: string, subtitle: string, actionCancel: boolean, alert?: string,) {
    return this.matDialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      width: '400px',
      data: {
        title,
        subtitle,
        alert,
        cancel: actionCancel,
      }
    });
  }

  openForm(componentType: ComponentType<unknown>, data: any, formSize: string, position?: any) {
    return this.matDialog.open(componentType, {
      disableClose: true,
      width: formSize,
      data
    });
  }

  showMessageSnackBar(title: string, alertColor: string): void{
    this.snackBar.open(
      title, 
      'Cerrar',
       {
         duration: 5000,
         panelClass: alertColor
       }
     );
  }
}
