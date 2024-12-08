import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { BandHttpService } from '../../../admin/services/band.http.service';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatTimepicker, MatTimepickerInput, MatTimepickerToggle } from '@angular/material/timepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep, MatStepper, MatStepperNext } from '@angular/material/stepper';
import { ConcertHttpService } from '../../services/concert.http.service';
import { ConcertEvent } from '../../components/concert-event/concert-event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-concert',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    MatInput,
    MatInputModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatChipInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatIcon,
    MatChipRow,
    MatChipGrid,
    MatLabel,
    MatError,
    MatChipRemove,
    MatButton,
    MatTimepickerInput,
    MatTimepickerToggle,
    MatTimepicker,
    MatStepper,
    MatStep,
    MatStepperNext
  ],
  providers: [
    provideNativeDateAdapter(),
    ConcertHttpService
  ],
  templateUrl: './create-concert.component.html',
  styleUrl: './create-concert.component.scss'
})
export class CreateConcertComponent implements OnInit {
  public bandNameList: string[] = [];
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public searchText = signal('');
  public readonly filteredBandNameList = computed(() => {
    const searchText = this.searchText();
    if (searchText) {
      return this.bandNameList.filter(band => band.includes(searchText));
    }
    return [];
  });
  public minDate = new Date();
  private authService = inject(AuthService);
  public managedBands = this.authService.currentUser()?.managedBands;
  private snackBar = inject(MatSnackBar);
  private bandHttpService = inject(BandHttpService);
  private fb = inject(FormBuilder);
  private concertHttpService = inject(ConcertHttpService);
  private router = inject(Router);

  public step1 = this.fb.group({
    date: [Date, Validators.required],
    gateOpeningTime: ['', Validators.required],
    place: ['', Validators.required],
    headLinerBand: ['', Validators.required]
  });
  public step2 = this.fb.group({
    supportBands: this.fb.array<FormControl<string>>([]),
    flyerUrl: [null]
  });
  public step3 = this.fb.group({
    description: [null, Validators.required]
  });
  public readonly concertForm = this.fb.group({
    step1: this.step1,
    step2: this.step2,
    step3: this.step3
  });

  public get supportBands(): string[] {
    return this.concertForm.get('step2.supportBands')!.value;
  }

  public ngOnInit(): void {
    this.bandHttpService.getBands().subscribe(bands => {
      this.bandNameList = bands.map(b => b.name);
    })
  }

  public removeBand(band: string): void {
    const index = this.concertForm.get('step2.supportBands')!.value.indexOf(band);
    if (index > -1) {
      this.concertForm.get('step2.supportBands')!.value.splice(index, 1);
    }
  }

  public addBand(event: MatChipInputEvent): void {
    this.concertForm.get('step2.supportBands')!.value.push(event.value);
    event.chipInput!.clear();
  }

  public bandSelected(opt: MatOption): void {
    this.concertForm.get('step2.supportBands')!.value.push(opt.value);
  }

  public updateSearchText(event: Event): void {
    this.searchText.set((event.target as HTMLInputElement).value);
  }

  public saveForm(): void {
    if (this.concertForm.invalid) {
      this.snackBar.open('Mentés sikertelen. Helytelen adatok', 'OK');
      return;
    }

    const formData = this.concertForm.value;
    const concertData = {
      id: 0,
      gateOpeningTime: formData.step1?.gateOpeningTime,
      place: formData.step1?.place,
      headlinerBand: formData.step1?.headLinerBand,
      description: formData.step3?.description,
      flyerUrl: formData.step2?.flyerUrl,
      supportBands: formData.step2?.supportBands
    } as ConcertEvent
    this.concertHttpService.createConcert(concertData).subscribe(concert => {
      this.snackBar.open('Koncert létrehozva', 'OK', {duration: 5000});
      this.router.navigate(['/']).then();
    });
  }
}
