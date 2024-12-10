import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Appsettings } from '../../../appsettings';
import { TokenData } from './auth/token-data';
import { User } from '../interfaces/user';

@Injectable({providedIn: 'root'})
export class AuthHttpService {
  private http = inject(HttpClient);
  private url = `${Appsettings.serverUrl}/authentication`;

  public auth(idToken: any): Observable<TokenData> {
    return this.http.post<TokenData>(`${this.url}/google-login`, {idToken: `${idToken}`});
  }

  public refreshTokens(accessToken: string, refreshToken: string): Observable<TokenData> {
    return this.http.post<TokenData>(`${this.url}/tokens`, {
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  }

  public loadUserData(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }
}

