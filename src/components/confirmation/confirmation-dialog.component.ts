import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import dictionaryUtils from '../../utils/dictionary.utils';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule],
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {

  dictionaryUtils = dictionaryUtils;
  utils = new Utils();

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
  }
}
