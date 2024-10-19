import { computed, Injectable, signal } from '@angular/core';
import { appSettings } from "../../../../app.settings";
import { jwtDecode } from "jwt-decode";
import { AuthenticationHttpService } from "./authentication.http.service";

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isAuthenticated = signal(false);
  public emailAddress = computed<string>(() => localStorage.getItem('userEmail') ?? '');
  public userName = computed<string>(() => localStorage.getItem('userName') ?? '');

  public constructor(private httpService: AuthenticationHttpService) {
    this.loadGoogleSDK();
    this.isAuthenticated.set(localStorage.getItem('idToken') !== null);
  }

  public signOut(): void {
    google.accounts.id.disableAutoSelect();
    this.isAuthenticated.set(false);
    google.accounts.id.revoke(this.emailAddress(), (): void => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
    });
  }

  public signIn(): void {
    google.accounts.id.prompt();
  }

  // TODO: make it private again!!!
  public loadUserData(): void {
    this.httpService.get(localStorage.getItem('idToken')).subscribe(res => {
      console.log(res);
    })
  }

  public valami(): void {
    this.httpService.getValami().subscribe(() => {
      console.log("DONE");
    })
  }

  private loadGoogleSDK(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client?hl=hu';
    script.onload = (): void => this.initializeGsi();
    document.body.appendChild(script);
  }

  private initializeGsi(): void {
    google.accounts.id.initialize({
      client_id: appSettings.clientId,
      callback: this.handleCredentialResponse.bind(this),
    });
  }

  private handleCredentialResponse(response: any): void {
    const idToken = response.credential;
    this.storeTokenDataInLocalStore(idToken);
    this.isAuthenticated.set(true);
    this.loadUserData();
  }

  private storeTokenDataInLocalStore(idToken: string): void {
    try {
      const decoded: any = jwtDecode(idToken);
      localStorage.setItem('userEmail', decoded.email);
      localStorage.setItem('userName', decoded.name);
      localStorage.setItem('idToken', idToken);
    } catch (error) {
      console.error(error);
    }
  }
}
