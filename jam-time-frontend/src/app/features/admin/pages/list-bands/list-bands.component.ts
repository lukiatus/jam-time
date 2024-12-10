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
import { BandHttpService } from '../../services/band.http.service';
import { IdNamePair } from '../../../../core/interfaces/id-name-pair';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { FilterButtonComponent } from "../../../../shared/components/filter-button/filter-button.component";
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../../../shared/dialogs/confirmation-dialog/ConfirmationDialogData';
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
    MatIconButton,
    MatTooltip,
    MatNoDataRow,
    MatSortModule,
    MatButton,
    FilterButtonComponent,
  ],
  templateUrl: './list-bands.component.html',
  styleUrl: './list-bands.component.scss'
})
export class ListBandsComponent implements OnInit {
  public dataSource = new MatTableDataSource<IdNamePair>();
  public sort = viewChild.required(MatSort);
  public paginator = viewChild.required(MatPaginator);
  private bandHttpService = inject(BandHttpService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  public ngOnInit(): void {
    this.bandHttpService.getBands().subscribe(bands => {
      this.dataSource.data = bands;
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    })
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onEdit(bandId: number): void {
    this.router.navigate(['/', 'admin', 'bands', 'edit', bandId]).then();
  }

  public onCreate(): void {
    this.router.navigate(['/', 'admin', 'bands', 'new']).then();
  }

  public onDelete(bandId: number): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Törlés megerősítése',
        body: 'Valóban törölni szeretnéd a zenekart?',
      } as ConfirmationDialogData
    });

    dialog.afterClosed().subscribe(confirmation => {
      if (!confirmation) {
        return;
      }

      this.bandHttpService.deleteBandById(bandId).subscribe(() => {
        this.dataSource.data = [...this.dataSource.data.filter(i => i.id !== bandId)];
      })
    })
  }
}
