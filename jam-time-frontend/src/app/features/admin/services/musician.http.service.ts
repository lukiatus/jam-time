import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsettings } from '../../../../appsettings';
import { Observable } from 'rxjs';
import { MusicianContact } from '../interfaces/musician-contact';

@Injectable({providedIn: 'root'})
export class MusicianHttpService {
  private http = inject(HttpClient);
  private url = `${Appsettings.serverUrl}/musicians`;

  public getMusicians(): Observable<MusicianContact[]> {
    return this.http.get<MusicianContact[]>(this.url);
  }
}
