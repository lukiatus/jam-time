import { Component, inject, OnInit, signal } from '@angular/core';
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarUtils,
  DateAdapter
} from "angular-calendar";
import dayjs from "dayjs";
import { adapterFactory } from "angular-calendar/date-adapters/moment";
import { MatButton } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { CustomDateFormatter } from "../../../../core/providers/custom-date-formatter.provioder";
import localeHu from "dayjs/locale/hu";
import { RoomHttpService } from '../../../admin/services/room.http.service';
import { ReservationHttpService } from '../../services/reservation.http.service';
import { MatStep, MatStepper, MatStepperNext } from '@angular/material/stepper';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Room } from '../../interfaces/room';
import { NewReservationRequest } from '../../interfaces/new-reservation.request';
import {
  ReservationSchedulerComponent
} from '../../components/reservation-scheduler/reservation-scheduler.component';
import { ScheduleData } from '../../components/reservation-scheduler/schedule-data';
import { CustomEventTitleFormatter } from '../../../../core/providers/custom-event-title-formatter.provider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from '../../dialogs/reservation-dialog/reservation-dialog.component';

export function dayjsAdapterFactory(): DateAdapter {
  dayjs.locale(localeHu);
  return adapterFactory(dayjs);
}

@Component({
  selector: 'app-create-reservation-dialog',
  imports: [
    CalendarModule,
    MatIconModule,
    MatStep,
    MatStepper,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatButton,
    MatStepperNext,
    ReservationSchedulerComponent,
  ],
  providers: [
    CalendarUtils,
    CalendarA11y,
    CalendarEventTitleFormatter,
    RoomHttpService,
    {
      provide: DateAdapter,
      useFactory: dayjsAdapterFactory,
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    }
  ],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss'
})
export class CreateReservationComponent implements OnInit {
  protected bands = inject(AuthService).currentUser()?.bands
  protected rooms: Room[] = [];
  protected events = signal<CalendarEvent[]>([]);
  protected readonly reservationForm: FormGroup;
  protected currentReservationId: number | undefined;
  private reservationHttpService = inject(ReservationHttpService);
  private roomHttpService = inject(RoomHttpService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  protected step1 = this.fb.group({
    from: [null, Validators.required],
    to: [null, Validators.required]
  });
  protected step2 = this.fb.group({
    bandId: [null, Validators.required],
    roomId: [null, Validators.required],
    remark: [null],
  });
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  public constructor() {
    this.reservationForm = this.fb.group({
      step1: this.step1,
      step2: this.step2
    });
  }

  public ngOnInit(): void {
    this.getCalendarEvents();
    this.getRooms();
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        this.currentReservationId = Number.parseInt(idString);
        this.loadReservationData();
      }
    })
  }

  public createReservation(): void {
    const formData = this.reservationForm.value;
    const reservationData = {
      from: formData.step1.from,
      to: formData.step1.to,
      bandId: formData.step2.bandId,
      roomId: formData.step2.roomId,
      remark: formData.step2.remark,
    } as NewReservationRequest;

    if (this.currentReservationId) {
      this.reservationHttpService.updateReservation(this.currentReservationId, reservationData).subscribe(() => {
        this.snackBar.open('Foglalás módosítva', 'OK', {duration: 5000});
        this.router.navigate(['/', 'reservations', 'my-reservations']).then();
      })
    } else {
      this.reservationHttpService.createReservation(reservationData).subscribe(() => {
        this.snackBar.open('Foglalás létrehozva', 'OK', {duration: 5000});
        this.router.navigate(['/', 'reservations', 'my-reservations']).then();
      })
    }
  }

  public updateSchedule(event: ScheduleData): void {
    this.reservationForm.patchValue({
      step1: {
        from: event.from,
        to: event.to,
      }
    });
  }

  public openReservationById(reservationId: number): void {
    this.dialog.open(ReservationDialogComponent, {data: {reservationId: reservationId}});
  }

  private getCalendarEvents(): void {
    this.reservationHttpService.getOverview().subscribe(reservations => {
      this.events.set(...[reservations.map((r) => {
        return {
          id: r.reservationId,
          start: new Date(r.from!),
          end: new Date(r.to!),
          title: r.remark ? `${r.band} (${r.remark})` : r.band,
          cssClass: 'normal'
        } as CalendarEvent;
      })]);
    })
  }

  private getRooms(): void {
    this.roomHttpService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  private loadReservationData(): void {
    this.reservationHttpService.getReservationById(this.currentReservationId!).subscribe(reservation => {
      this.reservationForm.patchValue({
        step1: {
          from: reservation.from,
          to: reservation.to,
        }
      });
      this.reservationForm.patchValue({
        step2: {
          bandId: 1,
          roomId: 1,
          remark: 'Loaded...'
        }
      });
    })
  }
}

