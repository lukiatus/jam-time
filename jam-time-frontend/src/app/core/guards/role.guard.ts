import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject, Injectable } from '@angular/core';

@Injectable(
  {providedIn: 'root'}
)
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);

  public canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    const requiredRoles = route.data['roles'];

    return this.authService.hasRoles(requiredRoles);
  }
}
