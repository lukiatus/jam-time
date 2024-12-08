import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../../../core/interfaces/user';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-account-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatChipSet,
    MatChip,
    NgForOf,
    NgIf,
  ],
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.scss'
})
export class AccountDialogComponent {
  protected data = inject<User>(MAT_DIALOG_DATA);
}
