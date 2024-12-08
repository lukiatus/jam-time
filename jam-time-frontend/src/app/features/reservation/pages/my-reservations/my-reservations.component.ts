import { Component, inject, OnInit, viewChild } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { Reservation } from '../../interfaces/reservation';
import { ReservationHttpService } from '../../services/reservation.http.service';
import { ReservationStatusEnum } from '../../../../core/enums/reservation-status.enum';
import { MyReservationListResponse } from '../../interfaces/my-reservation-list.response';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from '../../dialogs/reservation-dialog/reservation-dialog.component';
import { FilterButtonComponent } from '../../../../shared/components/filter-button/filter-button.component';
import { DateUtils } from '../../../../shared/utils/date.utils';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bands',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatSort,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatRowDef,
    MatHeaderRowDef,
    MatIcon,
    MatNoDataRow,
    MatSortModule,
    FilterButtonComponent,
    MatButton
  ],
  templateUrl: './my-reservations.component.html',
  standalone: true,
  styleUrl: './my-reservations.component.scss'
})
export class MyReservationsComponent implements OnInit {
  public dataSource = new MatTableDataSource<MyReservationListResponse>();
  public sort = viewChild.required(MatSort);
  public paginator = viewChild.required(MatPaginator);
  public displayedColumns = ['date', 'from', 'to', 'band', 'place', 'remark', 'status'];
  protected readonly ReservationStatusEnum = ReservationStatusEnum;
  protected readonly DateUtils = DateUtils;
  protected readonly Date = Date;
  private reservationHttpService = inject(ReservationHttpService)
  private readonly dialog = inject(MatDialog);
  private router = inject(Router);

  public ngOnInit(): void {
    this.loadReservations();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDetails(reservation: Reservation): void {
    this.dialog.open(ReservationDialogComponent, {data: {viewMode: 'view', reservationId: reservation.id}})
      .afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadReservations();
      }
    })
  }

  public onCreate(): void {
    this.router.navigate(['/', 'reservations', 'new']).then();
  }

  private loadReservations(): void {
    this.reservationHttpService.getMyReservations().subscribe(reservations => {
      this.dataSource.data = reservations;
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    })
  }
}
