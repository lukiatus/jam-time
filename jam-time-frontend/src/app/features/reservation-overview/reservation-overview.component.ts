import { Component } from '@angular/core';
import { NgSwitch, NgSwitchCase } from "@angular/common";
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  CalendarView,
  DateAdapter,
  DAYS_OF_WEEK,
  MOMENT, CalendarUtils, CalendarA11y, CalendarEventTitleFormatter
} from "angular-calendar";
import { Subject } from "rxjs";
import dayjs from "dayjs";
import hu from 'dayjs/locale/hu';
import { adapterFactory } from "angular-calendar/date-adapters/moment";

dayjs.locale({
  ...hu,
  weekStart: DAYS_OF_WEEK.MONDAY,
});

export function dayjsAdapterFactory() {
  return adapterFactory(dayjs);
}

@Component({
  selector: 'app-reservation-overview',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    CalendarModule
  ],
  providers: [
    CalendarUtils,
    CalendarA11y,
    CalendarEventTitleFormatter,
    {
      provide: MOMENT,
      useValue: dayjs,
    },
    {
      provide: DateAdapter,
      useFactory: dayjsAdapterFactory,
    },
    {
      provide: CalendarDateFormatter,
      useClass: CalendarMomentDateFormatter,
    }
  ],
  templateUrl: './reservation-overview.component.html',
  styleUrl: './reservation-overview.component.scss'
})
export class ReservationOverviewComponent {

  public activeDayIsOpen: boolean = true;
  public view: CalendarView = CalendarView.Month;
  public viewDate: Date = new Date();

  public refresh = new Subject<void>();
  public events: CalendarEvent[] = [
    {
      start: dayjs(this.viewDate).add(-1, "hour").toDate(),
      end: dayjs(this.viewDate).add(1, "hour").toDate(),
      title: 'An event...',
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
  ];
  protected readonly CalendarView = CalendarView;

  public dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    console.log(date)
    if (dayjs(date).isSame(this.viewDate, 'month')) {
      if (
        (dayjs(date).isSame(this.viewDate, 'day') && this.activeDayIsOpen) || events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  public handleEvent(action: string, event: CalendarEvent): void {
    alert(`${action}: ${event}`);
  }

  public eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
}
