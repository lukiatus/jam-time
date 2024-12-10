import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { NgIf } from "@angular/common";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs";
import { MediaMatcher } from "@angular/cdk/layout";
import { LoadingIndicatorService } from "../../core/services/spinner/loading-indicator.service";
import { HeaderComponent } from "./header/header.component";
import { NavigationMenuComponent } from "./navigation-menu/navigation-menu.component";
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    MatProgressBar,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    NgIf,
    RouterOutlet,
    HeaderComponent,
    NavigationMenuComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy, AfterViewInit {
  protected mobileQuery: MediaQueryList;
  protected spinnerService = inject(LoadingIndicatorService);
  protected isMenuCollapsed = false;
  protected authService = inject(AuthService);
  private readonly _mobileQueryListener: () => void;
  private autoLogoutSubscription: Subscription = new Subscription;
  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);

  public constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = (): void => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public toggleMenu(sidenav: MatSidenav): void {
    if (this.mobileQuery.matches) {
      sidenav.toggle().then();
      this.isMenuCollapsed = false;
    } else {
      sidenav.open().then();
      this.isMenuCollapsed = !this.isMenuCollapsed;
    }
  }
}
