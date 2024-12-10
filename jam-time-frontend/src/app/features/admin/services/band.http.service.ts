import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsettings } from '../../../../appsettings';
import { Observable } from 'rxjs';
import { Band } from '../interfaces/band';
import { BandRequest } from '../interfaces/band.request';

@Injectable({providedIn: 'root'})
export class BandHttpService {
  private http = inject(HttpClient);
  private url = `${Appsettings.serverUrl}/bands`;

  public getBands(): Observable<Band[]> {
    return this.http.get<Band[]>(this.url);
  }

  public getBandById(bandId: number): Observable<Band> {
    return this.http.get<Band>(`${this.url}/${bandId}`);
  }

  public createBand(request: BandRequest): Observable<Band> {
    return this.http.post<Band>(this.url, request);
  }

  public editBand(bandId: number, request: BandRequest): Observable<Band> {
    return this.http.put<Band>(`${this.url}/${bandId}`, request);
  }

  public deleteBandById(bandId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${bandId}`);
  }
}
