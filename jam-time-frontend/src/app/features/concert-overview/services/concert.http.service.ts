import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsettings } from '../../../../appsettings';
import { Observable } from 'rxjs';
import { ConcertEvent } from '../components/concert-event/concert-event';

export class ConcertHttpService {
  private http = inject(HttpClient);
  private url = `${Appsettings.serverUrl}/concerts`;

  public getConcerts(): Observable<ConcertEvent[]> {
    return this.http.get<ConcertEvent[]>(this.url);
  }

  public createConcert(concertData: ConcertEvent): Observable<ConcertEvent> {
    return this.http.post<ConcertEvent>(this.url, concertData);
  }

  public deleteConcertById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
