import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AsyncPipe, NgIf } from "@angular/common";
import { MatBadge } from "@angular/material/badge";
import { MatButton, MatFabButton, MatIconButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatIcon } from "@angular/material/icon";
import { MatLine } from "@angular/material/core";
import { MatListItem, MatListSubheaderCssMatStyler, MatNavList } from "@angular/material/list";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs";
import { MediaMatcher } from "@angular/cdk/layout";
import { SpinnerService } from "../../core/services/spinner.service";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    MatBadge,
    MatButton,
    MatDivider,
    MatIcon,
    MatIconButton,
    MatLine,
    MatListItem,
    MatListSubheaderCssMatStyler,
    MatMenu,
    MatMenuItem,
    MatNavList,
    MatProgressBar,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    MatTooltip,
    NgIf,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    MatMenuTrigger,
    MatFabButton,
    HeaderComponent,
    NavbarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy, AfterViewInit {
  public mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  private autoLogoutSubscription: Subscription = new Subscription;

  public constructor(private changeDetectorRef: ChangeDetectorRef,
                     private media: MediaMatcher,
                     public spinnerService: SpinnerService,
                     public authService: AuthenticationService,
                     //private authGuard: AuthGuard
  ) {

    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = (): void => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('', this._mobileQueryListener);
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('', this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public signIn(): void {
    this.spinnerService.show();
    this.authService.signIn();
  }

  public signOut(): void {
    this.authService.signOut();
  }
}
