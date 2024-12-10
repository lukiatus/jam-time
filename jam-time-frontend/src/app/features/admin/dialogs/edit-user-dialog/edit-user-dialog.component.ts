import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { UserHttpService } from '../../services/user.http.service';
import { UserEditData } from '../../interfaces/user-edit-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationRoles } from '../../../../core/constants/application-roles.const';

@Component({
  selector: 'app-edit-user-dialog',
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatChipListbox,
    MatChipOption
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent implements OnInit {
  public readonly userForm: FormGroup;
  protected readonly ApplicationRoles = ApplicationRoles;
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);
  private userHttpService = inject(UserHttpService);
  private snackBar = inject(MatSnackBar);

  public constructor() {
    this.userForm = this.fb.group({
      userId: [null, [Validators.required]],
      name: [null, Validators.required],
      email: [null, Validators.required],
      roles: [[], Validators.required]
    });
  }

  public get roles(): string[] {
    return this.userForm.get('roles')?.value;
  }

  public ngOnInit(): void {
    this.userHttpService.getUserById(this.data.userId).subscribe(user => {
      this.userForm.patchValue({
        userId: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles
      });
    })
  }

  public onSave(): void {
    if (this.userForm.invalid) {
      return
    }

    const formData = this.userForm.value;
    const userEditData = {
      name: formData.name,
      email: formData.email,
      roles: formData.roles
    } as UserEditData;

    this.userHttpService.updateUser(this.data.userId, userEditData).subscribe(() => {
      this.snackBar.open('Sikeres módosítás', 'OK', {duration: 5000});
      this.dialogRef.close(true);
    })
  }

  public userOwnRole(role: ApplicationRoles): boolean {
    return this.roles.includes(role.toString());
  }
}
