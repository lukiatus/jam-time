import { Component } from '@angular/core';
import { NgClass, NgSwitch, NgSwitchCase } from "@angular/common";
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  CalendarModule,
  CalendarView,
  DateAdapter,
  CalendarUtils, CalendarA11y, CalendarEventTitleFormatter
} from "angular-calendar";
import { Subject } from "rxjs";
import dayjs from "dayjs";
import { adapterFactory } from "angular-calendar/date-adapters/moment";
import { MatButton } from "@angular/material/button";
import { CustomDateFormatter } from "../../core/providers/custom-date-formatter.provioder";
import localeHu from "dayjs/locale/hu";

export function dayjsAdapterFactory() {
  dayjs.locale(localeHu);
  return adapterFactory(dayjs);
}

@Component({
  selector: 'app-reservation-overview',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    CalendarModule,
    MatButton,
    NgClass
  ],
  providers: [
    CalendarUtils,
    CalendarA11y,
    CalendarEventTitleFormatter,
    {
      provide: DateAdapter,
      useFactory: dayjsAdapterFactory,
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
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

  public closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  public setView(view: CalendarView): void {
    this.view = view;
  }
}
