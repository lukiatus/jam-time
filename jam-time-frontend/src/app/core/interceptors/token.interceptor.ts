import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const accessToken = localStorage.getItem("auth-access-token");
  if (accessToken) {
    req = req.clone({headers: req.headers.set('Authorization', `Bearer ${accessToken}`)});
  }

  return next(req).pipe(
    // On HTTP401 error try to refresh token data and re-try the request
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !authService.authIsInProgress()) {
        return authService.loadUserData().pipe(
          switchMap(() => {
            const newAccessToken = localStorage.getItem("auth-access-token");
            const clonedReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)});
            return next(clonedReq);
          })
        );
      }
      return throwError(() => error); // If it's not a 401, just throw the error
    })
  );
}
