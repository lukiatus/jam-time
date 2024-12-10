import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { AuthHttpService } from "../auth.http.service";
import { jwtDecode } from 'jwt-decode';
import { TokenData } from './token-data';
import { Appsettings } from '../../../../appsettings';
import { User } from '../../interfaces/user';
import { LoadingIndicatorService } from '../spinner/loading-indicator.service';
import { finalize, map, Observable, of, tap } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({providedIn: 'root'})
export class AuthService {
  public authIsInProgress = signal<boolean>(false);
  private currentUserSignal = signal<User | null>(null);
  private httpService = inject(AuthHttpService);
  private loadingIndicatorService = inject(LoadingIndicatorService);
  private router = inject(Router);

  public constructor() {
    this.loadGoogleSDK();
    effect(() => {
      this.loadingIndicatorService.setLoading(this.authIsInProgress());
    });
  }

  public get currentUser(): Signal<User | null> {
    return this.currentUserSignal.asReadonly();
  }

  public signOut(): void {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(this.currentUserSignal()?.email, () => {
      this.deleteAuthRelatedLocalStorageData();
      this.currentUserSignal.set(null);
      this.router.navigate(['/']).then();
    });
  }

  public hasRoles(requiredRoles: string[]): boolean {
    if (!requiredRoles) {
      return false;
    }
    const userRoles = this.currentUserSignal()?.roles ?? [];
    return requiredRoles.some(r => userRoles.includes(r));
  }

  public loadUserData(): Observable<void> {
    const accessToken = localStorage.getItem(LocalStorageItems.AccessToken);
    const refreshToken = localStorage.getItem(LocalStorageItems.RefreshToken);
    if (!accessToken || !refreshToken) {
      return of();
    }

    this.authIsInProgress.set(true);
    return this.refreshTokens(accessToken, refreshToken).pipe(
      switchMap(tokenData => {
        localStorage.setItem(LocalStorageItems.AccessToken, tokenData.accessToken!);
        localStorage.setItem(LocalStorageItems.RefreshToken, tokenData.refreshToken!);

        const newTokenData = this.readAuthDataFromAccessToken(tokenData.accessToken);
        this.currentUserSignal.set(newTokenData);

        if (newTokenData) {
          return this.httpService.loadUserData(newTokenData.id).pipe(
            tap(user => {
              this.currentUserSignal.set(user);
              this.authIsInProgress.set(false);
            }),
            map(() => undefined)  // Convert Observable<User> to Observable<void>
          );
        }

        return of();
      }),
      catchError(error => {
        console.error("Error loading user data:", error);
        return of();
      }),
      finalize(() => {
        this.authIsInProgress.set(false);
      })
    );
  }

  private loadGoogleSDK(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client?hl=hu';
    script.onload = (): void => this.initializeGsi();
    document.body.appendChild(script);
  }

  private initializeGsi(): void {
    google.accounts.id.initialize({
      client_id: Appsettings.clientId,
      callback: this.handleCredentialResponse.bind(this)
    });
    google.accounts.id.renderButton(
      document.getElementById("googleLoginButton"),
      {theme: "outline", shape: "pill", size: "medium", click_listener: this.googleButtonClickHandler.bind(this)}
    );
  }

  private googleButtonClickHandler(): void {
    this.authIsInProgress.set(true);
  }

  private handleCredentialResponse(response: any): void {
    this.httpService.auth(response.credential).subscribe((tokenData: TokenData) => {
      localStorage.setItem(LocalStorageItems.AccessToken, tokenData.accessToken);
      localStorage.setItem(LocalStorageItems.RefreshToken, tokenData.refreshToken);
      const userId = this.readAuthDataFromAccessToken(tokenData.accessToken)?.id;

      if (!userId) {
        return;
      }

      this.loadUserData().subscribe();
    });
  }

  private deleteAuthRelatedLocalStorageData(): void {
    Object.keys(localStorage).filter(k => k.startsWith("auth-")).filter(k => localStorage.removeItem(k));
  }

  private readAuthDataFromAccessToken(accessToken: string): User | null {
    let userData: User | null = null;
    try {
      const decoded: any = jwtDecode(accessToken);
      if (typeof decoded.role === 'string') {
        decoded.role = [decoded.role]
      }

      userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        roles: decoded.role
      } as User;
    } catch (err) {
      console.error(err);
    }

    return userData;
  }

  private refreshTokens(accessToken: string, refreshToken: string): Observable<TokenData> {
    if (!accessToken || !refreshToken) {
      return of();
    }

    return this.httpService.refreshTokens(accessToken, refreshToken);
  }
}

const LocalStorageItems = {
  AccessToken: 'auth-access-token',
  RefreshToken: 'auth-refresh-token',
};
