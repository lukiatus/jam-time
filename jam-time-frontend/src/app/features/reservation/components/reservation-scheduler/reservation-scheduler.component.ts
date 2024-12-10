import { Component, input, OnChanges, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { ReservationSettings } from '../../../../core/constants/reservation-settings.const';
import dayjs from 'dayjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarModule,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent
} from 'angular-calendar';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { ScheduleData } from './schedule-data';

@Component({
  selector: 'app-reservation-scheduler',
  imports: [
    MatIconButton,
    MatTooltip,
    MatIcon,
    CalendarModule,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './reservation-scheduler.component.html',
  styleUrl: './reservation-scheduler.component.scss'
})
export class ReservationSchedulerComponent implements OnChanges {
  public reservations = input<CalendarEvent<string>[]>([])
  public reservationIdToJump = input<number>();
  public selectedReservationId = output<number>();
  protected timeslotSelected = output<ScheduleData>();
  protected view: CalendarView = CalendarView.Month;
  protected viewDate: Date = new Date();
  protected events: CalendarEvent<string>[] = [];
  protected readonly CalendarView = CalendarView;
  protected readonly ReservationConstants = ReservationSettings;

  public ngOnChanges(): void {
    this.events = this.reservations();
    const selectedEvent = this.reservations().find(e => e.id === this.reservationIdToJump());
    if (selectedEvent) {
      this.view = CalendarView.Day;
      this.viewDate = selectedEvent.start;
      selectedEvent.cssClass = 'new-event';
      selectedEvent.draggable = true;
      selectedEvent.resizable = {
        beforeStart: true,
        afterEnd: true,
      };
      selectedEvent.meta = this.ReservationConstants.placeholderMetaValue
    }
  }

  public setView(view: CalendarView): void {
    if (view == CalendarView.Month) {
      this.events = this.events.filter(e => e.meta == this.ReservationConstants.placeholderMetaValue)
    }
    this.view = view;
  }

  public addEvent(event: { date: Date; sourceEvent: MouseEvent }): void {
    if (dayjs(event.date).isBefore(dayjs())) {
      return;
    }

    const index = this.events.findIndex(i => i.meta === this.ReservationConstants.placeholderMetaValue)
    if (index != -1) {
      const updatedEvent = {
        ...this.events[index],
        start: event.date,
        end: dayjs(event.date).add(ReservationSettings.minReservationLengthInHours, 'hour').toDate()
      };
      this.events = this.events.map(event => event.id === updatedEvent.id ? updatedEvent : event);
      this.timeslotSelected.emit({from: updatedEvent.start, to: updatedEvent.end} as ScheduleData);

    } else {
      const clickSelector = {
        start: event.date,
        end: dayjs(event.date).add(ReservationSettings.minReservationLengthInHours, 'hour').toDate(),
        title: '<b><em>Új foglalás...</em></b>',
        cssClass: 'new-event',
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
        meta: this.ReservationConstants.placeholderMetaValue
      };

      this.events = [...this.events, clickSelector];
      this.timeslotSelected.emit({from: clickSelector.start, to: clickSelector.end} as ScheduleData);
    }
  }

  public eventTimesChanged(eventTimesChangedEvent: CalendarEventTimesChangedEvent): void {
    const validationResult = this.validateEventTimesChanged(eventTimesChangedEvent, false);
    eventTimesChangedEvent.event.cssClass = eventTimesChangedEvent.event.cssClass?.replace('in-move', '');
    const {event, newStart, newEnd} = eventTimesChangedEvent;
    if (validationResult) {
      const idx = this.events.findIndex(e => e.meta === this.ReservationConstants.placeholderMetaValue)
      if (idx > -1) {
        this.events[idx] = {
          ...event,
          start: newStart,
          end: newEnd
        }
        this.events = [...this.events];
      }
    }
    this.timeslotSelected.emit({from: newStart, to: newEnd} as ScheduleData);
  }

  public showEventDetails(event: CalendarEvent): void {
    if (event.meta === this.ReservationConstants.placeholderMetaValue || !event.id) {
      return;
    }

    const idAsNumber = (typeof event.id === "number") ? event.id : Number.parseInt(event.id);
    this.selectedReservationId.emit(idAsNumber);
  }

  public validateEventTimesChanged = (
    {event, newStart, newEnd}: CalendarEventTimesChangedEvent,
    addCssClass = true,
  ): boolean => {
    event.cssClass = 'in-move new-event';
    const overlappingEvent = this.events.find((otherEvent) => {
      return (
        otherEvent !== event && otherEvent.start.getTime() < newEnd!.getTime() && newStart.getTime() < otherEvent.end!.getTime()
      );
    });

    if (overlappingEvent) {
      if (addCssClass) {
        event.cssClass = 'in-move invalid-position';
      } else {
        return false;
      }
    }

    if (dayjs(newStart).hour() < ReservationSettings.firstAvailableHourInDay) {
      return false;
    }

    const latestAllowedTimeOfDay = dayjs(newEnd).hour(ReservationSettings.lastAvailableHourInDay + 1).minute(0).second(0);
    if (dayjs(newEnd) > latestAllowedTimeOfDay) {
      return false;
    }

    if (dayjs(newStart).add(ReservationSettings.maxReservationLengthInHours, 'h').isBefore(newEnd)) {
      return false;
    }

    return true;
  };

  public jumpToDay(date: Date): void {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  public beforeMonthViewRender($event: CalendarMonthViewBeforeRenderEvent): void {
    $event.body.forEach((day) => {
      const classList: string[] = [];
      if (dayjs(this.viewDate).isSame(day.date)) {
        classList.push('selected-date')
      }
      if (dayjs().startOf('d').isAfter(day.date)) classList.push('cal-disabled');
      day.cssClass = classList.join(' ');
    });
  }

  public beforeWeekViewRender($event: CalendarWeekViewBeforeRenderEvent): void {
    $event.header.forEach((day) => {
      day.cssClass = dayjs(this.viewDate).isSame(day.date) ? 'selected-date' : '';
    })

    $event.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          segment.cssClass = dayjs().isAfter(segment.date) ? 'cal-disabled' : '';
        })
      })
    })
  }

  public beforeDayViewRender($event: CalendarWeekViewBeforeRenderEvent): void {
    $event.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          segment.cssClass = dayjs().isAfter(segment.date) ? 'cal-disabled' : '';
        })
      })
    })
  }
}
