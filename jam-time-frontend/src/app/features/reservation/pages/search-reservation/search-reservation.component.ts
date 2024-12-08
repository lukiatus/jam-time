import { Component, inject, viewChild } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {
  MatDatepickerToggle, MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import { ReservationStatusEnum, toLocalString } from '../../../../core/enums/reservation-status.enum';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservationHttpService } from '../../services/reservation.http.service';
import { Reservation } from '../../interfaces/reservation';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DateUtils } from '../../../../shared/utils/date.utils';
import { ReservationDialogComponent } from '../../dialogs/reservation-dialog/reservation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'app-search-reservation-dialog',
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatStartDate,
    MatEndDate,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    MatNoDataRow,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAccordion
  ],
  templateUrl: './search-reservation.component.html',
  styleUrl: './search-reservation.component.scss'
})
export class SearchReservationComponent {
  public dataSource = new MatTableDataSource<Reservation>();
  public sort = viewChild.required(MatSort);
  public paginator = viewChild.required(MatPaginator);
  public displayedColumns = ['date', 'from', 'to', 'band', 'place', 'remark', 'status'];
  protected readonly ReservationStatusEnum = ReservationStatusEnum;
  protected readonly toLocalString = toLocalString;
  protected searchForm: FormGroup;
  protected reservation: Reservation[] = [];
  protected readonly DateUtils = DateUtils;
  private fb = inject(FormBuilder);
  private reservationHttpService = inject(ReservationHttpService);
  private dialog = inject(MatDialog);

  public constructor() {
    this.searchForm = this.fb.group({
      from: [null],
      to: [null],
      status: [null],
      searchText: [null]
    });
  }

  public onSearch(): void {
    const formData = this.searchForm.value;
    this.reservationHttpService.searchReservations(formData).subscribe(reservations => {
      this.dataSource.data = reservations;
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    });
  }

  public openDetails(reservation: Reservation): void {
    this.dialog.open(ReservationDialogComponent, {data: {viewMode: 'view', reservationId: reservation.id}})
      .afterClosed().subscribe((result) => {
      if (result) {
        this.onSearch();
      }
    })
  }
}
