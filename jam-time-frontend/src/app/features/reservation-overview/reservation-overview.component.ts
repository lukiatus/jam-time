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
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { CustomDateFormatter } from "../../core/providers/custom-date-formatter.provioder";
import localeHu from "dayjs/locale/hu";
import { MatTooltip } from "@angular/material/tooltip";

export function dayjsAdapterFactory(): DateAdapter {
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
    NgClass,
    MatIconModule,
    MatMiniFabButton,
    MatTooltip
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
  public activeDayIsOpen = true;
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
      this.activeDayIsOpen = !((dayjs(date).isSame(this.viewDate, 'day') && this.activeDayIsOpen) || events.length === 0);
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
