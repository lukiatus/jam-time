import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { ReservationHttpService } from '../../services/reservation.http.service';
import { Reservation } from '../../interfaces/reservation';
import { DateUtils } from '../../../../shared/utils/date.utils';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../../../../shared/dialogs/confirmation-dialog/ConfirmationDialogData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatIcon,
    NgIf,
    MatDialogClose
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.scss'
})
export class ReservationDialogComponent implements OnInit {
  protected reservationData: Reservation = {} as Partial<Reservation> as Reservation;
  protected readonly DateUtils = DateUtils;
  protected authService = inject(AuthService);
  private readonly data = inject(MAT_DIALOG_DATA);
  private reservationHttpService = inject(ReservationHttpService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef);

  public ngOnInit(): void {
    this.reservationHttpService.getReservationById(this.data.reservationId).subscribe(data => {
      this.reservationData = data;
    });
  }

  public onEdit(): void {
    this.router.navigate(['/', 'reservations', 'edit', this.data.reservationId]).then();
  }

  public onDelete(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Törlés megerősítése',
        body: 'Valóban törlöd a foglalást?',
      } as ConfirmationDialogData
    }).afterClosed().subscribe(confirmation => {
      if (!confirmation) {
        return;
      }

      this.reservationHttpService.deleteReservationById(this.data.reservationId).subscribe(() => {
        this.snackBar.open('Sikeres törlés', 'OK', {duration: 5000});
        this.dialogRef.close(true);
      });
    });
  }

  public onReject(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Elutasítás megerősítése',
        body: 'Valóban elutasítod a foglalást?',
      } as ConfirmationDialogData
    }).afterClosed().subscribe(confirmation => {
      if (!confirmation) {
        return;
      }

      this.reservationHttpService.rejectReservationById(this.data.reservationId).subscribe(() => {
        this.snackBar.open('Sikeres elutasítás', 'OK', {duration: 5000});
        this.dialogRef.close(true);
      });
    });
  }

  public isEditAllowedForUser(): boolean {
    if (this.authService.hasRoles(['admin'])) {
      return true;
    }

    if (this.authService.hasRoles(['band-leader', 'user'])) {
      return true; //TODO: csak a sajátját tudja törölni
    }

    return false;
  }

  public isDeleteAllowedForUser(): boolean {
    return this.isEditAllowedForUser();
  }

  public isRejectAllowedForUser(): boolean {
    return this.authService.hasRoles(['admin']);
  }
}
