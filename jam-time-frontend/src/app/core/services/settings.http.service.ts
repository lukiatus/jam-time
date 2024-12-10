import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsettings } from '../../../appsettings';
import { Settings } from './settings/settings';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettingsHttpService {
  private http = inject(HttpClient);
  private url = `${Appsettings.serverUrl}/settings`;

  public getSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.url);
  }

  public updateSettings(settings: Settings): Observable<void> {
    return this.http.put<void>(this.url, settings);
  }
}
