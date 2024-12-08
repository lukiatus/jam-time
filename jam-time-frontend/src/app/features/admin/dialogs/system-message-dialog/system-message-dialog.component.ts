import { Component, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-system-message-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './system-message-dialog.component.html',
  styleUrl: './system-message-dialog.component.scss'
})
export class SystemMessageDialogComponent {
  protected readonly message: string = inject(MAT_DIALOG_DATA);
}
