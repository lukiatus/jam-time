import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RoomHttpService } from '../../services/room.http.service';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Room } from '../../../reservation/interfaces/room';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-room-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    NgIf
  ],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.scss'
})
export class RoomDialogComponent implements OnInit {
  public readonly roomForm: FormGroup;
  public dialogRef = inject(MatDialogRef<RoomDialogComponent>);
  protected isEditMode = false;
  private roomHttpService = inject(RoomHttpService);
  private readonly data = inject(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);

  public constructor(private fb: FormBuilder) {
    this.roomForm = this.fb.group({
      name: [null, Validators.required],
      place: [null, Validators.required],
      capacity: [null, [Validators.required, Validators.min(2), Validators.max(99)]],
    });
  }

  public ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.roomHttpService.getRoomById(this.data.roomId).subscribe(room => {
        this.roomForm.patchValue(room);
      })
    }
  }

  public onSave(): void {
    if (this.roomForm.invalid) {
      return
    }

    const formData = this.roomForm.value;
    const roomData = {
      name: formData.name,
      place: formData.place,
      capacity: formData.capacity,
    } as Room;

    if (this.isEditMode) {
      this.roomHttpService.editRoom(this.data.roomId, roomData).subscribe(room => {
        this.snackBar.open('Módosítások mentve', 'OK', {duration: 5000});
        this.dialogRef.close(room);
      })
    } else {
      this.roomHttpService.createRoom(roomData).subscribe(room => {
        this.snackBar.open('Próbaterem létrehozva', 'OK', {duration: 5000});
        this.dialogRef.close(room);
      });
    }
  }
}
