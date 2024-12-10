import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appsettings } from '../../../../appsettings';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { UserEditData } from '../interfaces/user-edit-data';

@Injectable({providedIn: 'root'})
export class UserHttpService {
  private http = inject(HttpClient);
  private url = `${Appsettings.serverUrl}/users`;

  public getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.url);
  }

  public getUserById(id: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.url}/${id}`);
  }

  public updateUser(userId: string, userEditData: UserEditData): Observable<UserData> {
    return this.http.put<UserData>(`${this.url}/${userId}`, userEditData);
  }
}
