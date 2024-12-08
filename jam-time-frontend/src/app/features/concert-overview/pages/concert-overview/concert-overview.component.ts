import { Component, inject, OnInit } from '@angular/core';
import { ConcertEvent } from '../../components/concert-event/concert-event';
import { ConcertEventComponent } from '../../components/concert-event/concert-event.component';
import { ConcertHttpService } from '../../services/concert.http.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../../../../shared/dialogs/confirmation-dialog/ConfirmationDialogData';

@Component({
  selector: 'app-concert-overview',
  templateUrl: './concert-overview.component.html',
  styleUrl: './concert-overview.component.scss',
  imports: [
    ConcertEventComponent
  ],
  providers: [ConcertHttpService]
})
export class ConcertOverviewComponent implements OnInit {
  public concerts: ConcertEvent[] = [];
  private concertHttpService = inject(ConcertHttpService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  public ngOnInit(): void {
    this.concertHttpService.getConcerts().subscribe(concerts => {
      this.concerts = concerts;
    })
  }

  public canUserEdit(concert: ConcertEvent): boolean {
    if (this.authService.hasRoles(['admin'])) {
      return true;
    }

    if (this.authService.hasRoles(['band-leader'])
      && this.authService.currentUser()?.managedBands.some(i => i.name === concert.headlinerBand)) {
      return true;
    }

    return false;
  }

  public deleteConcert(concertId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Törlés megerősítése',
        body: 'Valóban törölni szeretnéd a koncert eseményt?',
      } as ConfirmationDialogData
    }).afterClosed().subscribe(confirmation => {
      if (!confirmation) {
        return
      }

      this.concertHttpService.deleteConcertById(concertId).subscribe(() => {
          const ind = this.concerts.findIndex(concert => concert.id === concertId);
          if (ind > 0) {
            this.concerts.splice(ind, 1);
          }
        }
      );
    })
  }
}
