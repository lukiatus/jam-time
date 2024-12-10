import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { Injectable } from '@angular/core';
import { ReservationSettings } from '../constants/reservation-settings.const';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  public override weekTooltip(event: CalendarEvent): string {
    if (event.meta == ReservationSettings.placeholderMetaValue) {
      return 'Átmozgatással és átméretezéssel állítsd be a kívánt időtartamot majd kattints a "Tovább" gombra.';
    } else {
      return '';
    }
  }

  public override dayTooltip(event: CalendarEvent): string {
    if (event.meta == ReservationSettings.placeholderMetaValue) {
      return 'Átmozgatással és átméretezéssel állítsd be a kívánt időtartamot majd kattints a "Tovább" gombra.';
    } else {
      return '';
    }
  }
}
