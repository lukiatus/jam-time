import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewResponse } from '../interfaces/overview.response';
import { Appsettings } from '../../../../appsettings';
import { Reservation } from '../interfaces/reservation';
import { MyReservationListResponse } from '../interfaces/my-reservation-list.response';
import { NewReservationRequest } from '../interfaces/new-reservation.request';
import { SearchReservationRequest } from '../interfaces/search-reservation.request';

@Injectable({providedIn: 'root'})
export class ReservationHttpService {
  private http = inject(HttpClient);
  private url = `${Appsettings.serverUrl}/reservations`;

  public getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.url}/${id}`);
  }

  public getOverview(): Observable<OverviewResponse[]> {
    return this.http.get<OverviewResponse[]>(this.url);
  }

  public createReservation(reservation: NewReservationRequest): Observable<Reservation> {
    return this.http.post<Reservation>(this.url, reservation);
  }

  public updateReservation(reservationId: number, reservation: NewReservationRequest): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.url}/${reservationId}`, reservation);
  }

  public getMyReservations(): Observable<MyReservationListResponse[]> {
    return this.http.get<MyReservationListResponse[]>(`${this.url}/my-reservations`);
  }

  public searchReservations(request: SearchReservationRequest): Observable<Reservation[]> {
    let params = new HttpParams();
    if (request.from) {
      params = params.set('from', request.from.toISOString());
    }
    if (request.to) {
      params = params.set('to', request.to.toISOString());
    }
    if (request.status) {
      params = params.set('status', request.status);
    }
    if (request.searchText) {
      params = params.set('searchText', request.searchText);
    }

    return this.http.get<Reservation[]>(`${this.url}/search`, {params});
  }

  public deleteReservationById(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${reservationId}`);
  }

  public rejectReservationById(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/reject/${reservationId}`);
  }
}
