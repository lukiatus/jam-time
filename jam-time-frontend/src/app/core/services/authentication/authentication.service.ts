import { computed, inject, Injectable, signal } from '@angular/core';
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
  private httpService = inject(AuthenticationHttpService);

  public constructor() {
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

  private authenticateWithServer(): void {
    this.httpService.auth(localStorage.getItem('idToken')).subscribe(res => {
      console.log(res);
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
      callback: this.handleCredentialResponse.bind(this)
    });
    google.accounts.id.renderButton(
      document.getElementById("googleLoginButton"),
      {theme: "outline", shape: "pill", size: "medium"}
    );
  }

  private handleCredentialResponse(response: any): void {
    const idToken = response.credential;
    this.storeTokenDataInLocalStore(idToken);
    this.isAuthenticated.set(true);
    this.authenticateWithServer();
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
