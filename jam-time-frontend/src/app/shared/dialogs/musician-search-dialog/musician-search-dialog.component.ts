import { Component, inject, OnInit, viewChild } from '@angular/core';
import {
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterRow,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MusicianContact } from '../../../features/admin/interfaces/musician-contact';
import { MusicianHttpService } from '../../../features/admin/services/musician.http.service';
import { FilterButtonComponent } from '../../components/filter-button/filter-button.component';

@Component({
  selector: 'app-musician-search-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFooterRow,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    FilterButtonComponent,
    MatHeaderCellDef,
    MatNoDataRow
  ],
  templateUrl: './musician-search-dialog.component.html',
  styleUrl: './musician-search-dialog.component.scss'
})
export class MusicianSearchDialogComponent implements OnInit {
  public dataSource = new MatTableDataSource<MusicianContact>();
  public sort = viewChild.required(MatSort);
  public paginator = viewChild.required(MatPaginator);
  private musicianHttpService = inject(MusicianHttpService);
  private dialogRef = inject(MatDialogRef);

  public ngOnInit(): void {
    this.musicianHttpService.getMusicians().subscribe(musicians => {
      this.dataSource.data = musicians;
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    })
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public selectMusician(selectedMusician: MusicianContact): void {
    this.dialogRef.close(selectedMusician);
  }
}
