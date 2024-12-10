import { Component, LOCALE_ID } from '@angular/core';
import { LayoutComponent } from './shared/layout/layout.component';
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import localeHu from '@angular/common/locales/hu';

registerLocaleData(localeHu);

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: '<app-layout></app-layout>',
  providers: [
    {provide: LOCALE_ID, useValue: 'hu'},
    {provide: MAT_DATE_LOCALE, useValue: 'hu'},
    provideNativeDateAdapter()
  ],
})
export class AppComponent {
  public title = 'jam-time-frontend';
}
