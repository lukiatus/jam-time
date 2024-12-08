import { CalendarEventTitleFormatter } from 'angular-calendar';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  public override weekTooltip(): string {
     return '';
  }

  public override dayTooltip(): string {
    return '';
  }
}
