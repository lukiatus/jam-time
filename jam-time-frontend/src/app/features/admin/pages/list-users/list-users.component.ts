import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FilterButtonComponent } from "../../../../shared/components/filter-button/filter-button.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterRow,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MusicianContact } from '../../interfaces/musician-contact';
import { UserHttpService } from '../../services/user.http.service';
import { UserData } from '../../interfaces/user-data';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../../dialogs/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-list-users',
  imports: [
    FilterButtonComponent,
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
    MatHeaderCellDef,
    MatNoDataRow
  ],
  providers: [UserHttpService],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {
  public dataSource = new MatTableDataSource<UserData>();
  public sort = viewChild.required(MatSort);
  public paginator = viewChild.required(MatPaginator);
  private userHttpService = inject(UserHttpService);
  private dialog = inject(MatDialog);

  public ngOnInit(): void {
    this.loadUsers();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public selectUser(selectedUser: MusicianContact): void {
    this.dialog.open(EditUserDialogComponent, {data: {userId: selectedUser.id}})
      .afterClosed().subscribe((result: UserData) => {
      if (result) {
        this.loadUsers();
      }
    })
  }

  private loadUsers(): void {
    this.userHttpService.getUsers().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    })
  }
}
