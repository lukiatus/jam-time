import { Component, inject, OnInit } from '@angular/core';
import { OverviewResponse } from '../../interfaces/overview.response';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { ReservationHttpService } from '../../services/reservation.http.service';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import dayjs from 'dayjs';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from '../../dialogs/reservation-dialog/reservation-dialog.component';
import { MatIconButton } from '@angular/material/button';

dayjs.locale('hu')

@Component({
  selector: 'app-overview-reservation-dialog',
  imports: [
    NgForOf,
    DatePipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanelDescription,
    MatIcon,
    NgIf,
    MatIconButton
  ],
  templateUrl: './overview-reservation.component.html',
  standalone: true,
  styleUrl: './overview-reservation.component.scss'
})
export class OverviewReservationComponent implements OnInit {
  protected reservations: [string, OverviewResponse[]][] = [];
  private reservationHttpService = inject(ReservationHttpService);
  private dialog = inject(MatDialog);

  public ngOnInit(): void {
    this.loadReservations();
  }

  public openReservation(reservationId: string | undefined): void {
    this.dialog.open(ReservationDialogComponent, {data: {viewMode: 'view', reservationId: reservationId}})
      .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadReservations();
      }
    })
  }

  private groupByMonth(items: OverviewResponse[]): Record<string, OverviewResponse[]> {
    return items.reduce((acc, item) => {
      const monthYear = dayjs(item.from).format('YYYY. MMMM');
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push(item);
      return acc;
    }, {} as Record<string, OverviewResponse[]>);
  }

  private loadReservations(): void {
    this.reservationHttpService.getOverview().subscribe((reservations: OverviewResponse[]) => {
      this.reservations = Object.entries(this.groupByMonth(reservations));
    })
  }
}
