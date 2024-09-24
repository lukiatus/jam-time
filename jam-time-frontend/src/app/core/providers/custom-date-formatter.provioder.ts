import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { Injectable } from '@angular/core';
import dayjs from "dayjs";

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  public override monthViewTitle({date, locale}: DateFormatterParams): string {
    return dayjs(date).format('YYYY. MMMM');
  }

  public override monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return dayjs(date).format('dddd').toUpperCase();
  }

  public override weekViewTitle({date, locale, weekStartsOn, excludeDays, daysInWeek,}: DateFormatterParams): string {
    const startOfWeek = dayjs(date).startOf('week');
    const endOfWeek = dayjs(date).endOf('week');
    return `${startOfWeek.format('YYYY. MMMM D.')} - ${endOfWeek.format('YYYY. MMMM D.')}`;
  }

  public override weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    return dayjs(date).format('dddd').toUpperCase();
  }

  public override weekViewColumnSubHeader({date, locale,}: DateFormatterParams): string {
    return dayjs(date).format('MMM. D.');
  }

  public override weekViewHour({date, locale}: DateFormatterParams): string {
    return dayjs(date).format('HH:mm');
  }

  public override dayViewTitle({date, locale}: DateFormatterParams): string {
    return dayjs(date).format('YYYY. MMMM d., dddd');
  }

  public override dayViewHour({date, locale}: DateFormatterParams): string {
    return dayjs(date).format('HH:mm');
  }
}
