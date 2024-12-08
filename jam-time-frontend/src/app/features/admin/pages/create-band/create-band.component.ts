import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BandHttpService } from '../../services/band.http.service';
import { Musician } from '../../interfaces/musician';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {
  MusicianSearchDialogComponent
} from '../../../../shared/dialogs/musician-search-dialog/musician-search-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChip, MatChipRemove, MatChipSet } from '@angular/material/chips';
import { NgIf } from '@angular/common';
import { BandRequest } from '../../interfaces/band.request';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-band',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIcon,
    MatLabel,
    MatError,
    MatButton,
    MatChipSet,
    MatChip,
    MatChipRemove,
    NgIf,
  ],
  templateUrl: './create-band.component.html',
  styleUrl: './create-band.component.scss'
})
export class CreateBandComponent implements OnInit {
  public readonly bandForm: FormGroup;
  protected isEditMode = false;
  private bandHttpService = inject(BandHttpService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private currentBandId?: number;
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  public constructor() {
    this.bandForm = this.fb.group({
      name: [null, Validators.required],
      leader: [null, Validators.required],
      members: [[], Validators.required]
    });
  }

  public get leader(): string {
    return this.bandForm.controls['leader'].value?.name ?? '';
  }

  public get members(): Musician[] {
    return this.bandForm.get('members')?.value;
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        this.isEditMode = true;
        this.currentBandId = Number.parseInt(idString);
        this.bandHttpService.getBandById(this.currentBandId).subscribe(band => {
          this.bandForm.patchValue({
            name: band.name,
            leader: band.leader,
            members: band.members
          });
        })
      }
    })
  }

  public onSave(): void {
    if (this.bandForm.invalid) {
      return
    }

    const formData = this.bandForm.value;
    const bandData = {
      name: formData.name,
      leaderMusicianId: formData.leader.id,
      members: formData.members.map((i: Musician) => i.id),
    } as BandRequest;

    if (this.isEditMode) {
      this.bandHttpService.editBand(this.currentBandId!, bandData).subscribe(() => {
        this.snackBar.open('Zenekar módosítáva', 'OK', {duration: 5000});
        this.router.navigate(['/', 'admin', 'bands']).then();
      })
    } else {
      this.bandHttpService.createBand(bandData).subscribe(() => {
        this.snackBar.open('Zenekar létrehozva', 'OK', {duration: 5000});
        this.router.navigate(['/', 'admin', 'bands']).then();
      })
    }
  }

  public changeLeader(): void {
    this.dialog.open(MusicianSearchDialogComponent).afterClosed().subscribe((musician: Musician) => {
      if (musician) {
        this.bandForm.patchValue({
          leader: musician
        });
        if (!this.members.some((i: Musician) => i.id === musician.id)) {
          this.members.push(musician);
          this.bandForm.controls['members'].updateValueAndValidity();
        }
      }
    });
  }

  public addMember(): void {
    this.dialog.open(MusicianSearchDialogComponent).afterClosed().subscribe((musician: Musician) => {
      if (musician && !this.members.some((i: Musician) => i.id === musician.id)) {
        this.members.push(musician);
        this.bandForm.controls['members'].updateValueAndValidity();
      }
    });
  }

  public removeBandMemberById(musicianId: number): void {
    this.bandForm.patchValue({members: this.members.filter((member: Musician) => member.id !== musicianId)});
    this.bandForm.controls['members'].updateValueAndValidity();
  }
}
