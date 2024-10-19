import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationHttpService {
  public constructor(private http: HttpClient) {
  }

  public auth(idToken: any): Observable<string> {
    return this.http.post<string>("https://localhost:57679/auth/google-login", {idToken: `${idToken}`});
  }
}

