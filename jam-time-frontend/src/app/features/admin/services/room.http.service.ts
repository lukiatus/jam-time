import { HttpClient } from '@angular/common/http';
import { Room } from '../../reservation/interfaces/room';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Appsettings } from '../../../../appsettings';

@Injectable({providedIn: 'root'})
export class RoomHttpService {
  private http = inject(HttpClient);
  private url = `${Appsettings.serverUrl}/rooms`;

  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url);
  }

  public getRoomById(roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${roomId}`);
  }

  public createRoom(roomData: Room): Observable<Room> {
    return this.http.post<Room>(this.url, roomData);
  }

  public editRoom(roomId: number, roomData: Room): Observable<Room> {
    return this.http.put<Room>(`${this.url}/${roomId}`, roomData);
  }

  public deleteRoomById(roomId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${roomId}`);
  }
}
