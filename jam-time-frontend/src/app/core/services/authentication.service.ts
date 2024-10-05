import { computed, Injectable, signal } from '@angular/core';
import { appSettings } from "../../../app.settings";
import { jwtDecode } from "jwt-decode";

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isAuthenticated = signal(false);
  public emailAddress = computed<string>(() => localStorage.getItem('userEmail') ?? '');

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
    });
  }

  public signIn(): void {
    google.accounts.id.prompt();
  }

  private loadGoogleSDK(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = (): void => this.initializeGsi();
    document.body.appendChild(script);
  }

  private initializeGsi(): void {
    google.accounts.id.initialize({
      client_id: appSettings.clientId,
      callback: this.handleCredentialResponse.bind(this),
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {theme: "outline", size: "large"}
    );
  }

  private handleCredentialResponse(response: any): void {
    const idToken = response.credential;
    const email = this.getEmailFromToken(idToken);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('userEmail', email);
    this.isAuthenticated.set(true);
  }

  private getEmailFromToken(token: string): string {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.email;
    } catch (error) {
      return '';
    }
  }
}
