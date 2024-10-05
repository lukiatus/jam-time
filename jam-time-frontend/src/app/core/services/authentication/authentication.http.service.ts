import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationHttpService {
  public constructor(private http: HttpClient) {
  }

  public get(idToken: any): Observable<string> {
    return this.http.post<string>("https://localhost:7004/login", null, {
      headers: {
        GoogleIdToken: `${idToken}`
      }
    });
  }

  public getValami(): Observable<any> {
    return this.http.get("/get");
  }
}
