import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatButton } from '@angular/material/button';
import { ConfirmationDialogData } from './ConfirmationDialogData';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  public dialogTitle: string;
  public dialogBody: string;
  private data = inject(MAT_DIALOG_DATA) as ConfirmationDialogData;

  public constructor() {
    this.dialogTitle = this.data.title;
    this.dialogBody = this.data.body;
  }
}
