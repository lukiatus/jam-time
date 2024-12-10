import { Component, inject, OnInit, viewChild } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatFooterRow,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { RoomHttpService } from '../../services/room.http.service';
import { Room } from '../../../reservation/interfaces/room';
import { FilterButtonComponent } from '../../../../shared/components/filter-button/filter-button.component';
import { MatDialog } from '@angular/material/dialog';
import { RoomDialogComponent } from '../../dialogs/room-dialog/room-dialog.component';
import {
  ConfirmationDialogComponent
} from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-rooms',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatSort,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatNoDataRow,
    MatSortModule,
    MatFooterRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    FilterButtonComponent,
  ],
  templateUrl: './list-rooms.component.html',
  styleUrl: './list-rooms.component.scss'
})
export class ListRoomsComponent implements OnInit {
  public dataSource = new MatTableDataSource<Room>();
  public sort = viewChild.required(MatSort);
  public paginator = viewChild.required(MatPaginator);
  private roomHttpService = inject(RoomHttpService)
  private dialog = inject(MatDialog);

  public ngOnInit(): void {
    this.roomHttpService.getRooms().subscribe(rooms => {
      this.dataSource.data = rooms;
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    })
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onEdit(roomId: number): void {
    const dialog = this.dialog.open(RoomDialogComponent, {data: {roomId: roomId}});
    dialog.afterClosed().subscribe((editedRoom: Room) => {
      if (!editedRoom) {
        return;
      }

      const data = this.dataSource.data.find(i => i.id === editedRoom.id)!;
      data.name = editedRoom.name;
      data.place = editedRoom.place;
      data.capacity = editedRoom.capacity;
    });
  }

  public onCreate(): void {
    const dialog = this.dialog.open(RoomDialogComponent);
    dialog.afterClosed().subscribe((newRoom: Room) => {
      if (!newRoom) {
        return;
      }

      this.dataSource.data = [...this.dataSource.data, newRoom];
    });
  }

  public onDelete(roomId: number): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Törlés megerősítése',
        body: 'Valóban törölni szeretnéd a próbatermet?',
      }
    });

    dialog.afterClosed().subscribe(confirmation => {
      if (!confirmation) {
        return;
      }

      this.roomHttpService.deleteRoomById(roomId).subscribe(() => {
        this.dataSource.data = [...this.dataSource.data.filter(i => i.id !== roomId)];
      })
    })
  }
}
