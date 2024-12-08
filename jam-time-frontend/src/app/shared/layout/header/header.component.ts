import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatBadge } from "@angular/material/badge";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../core/services/auth/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from '../../../features/account/dialogs/account-dialog/account-dialog.component';
import { AppNotificationService } from '../../../core/services/app-notification/app-notification.service';
import { AppNotificationDialogComponent } from '../app-notification-dialog/app-notification-dialog.component';

@Component({
  selector: 'app-header',
  imports: [
    MatBadge,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    MatTooltip,
    NgIf,
    RouterLink,
    MatMenuTrigger,
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() public toggleSidenav = new EventEmitter<void>();
  protected authService = inject(AuthService);
  private notificationService = inject(AppNotificationService);
  public notificationCount = this.notificationService.notificationCount;
  private dialog = inject(MatDialog);

  public get loginButtonStyle(): { display: string } {
    return {'display': this.authService.currentUser() ? 'none' : 'inline-block'}
  }

  public logoff(): void {
    this.authService.signOut();
    this.notificationService.shutdown();
  }

  public showAccountInfo(): void {
    this.dialog.open(AccountDialogComponent, {
      data: this.authService.currentUser(),
      autoFocus: 'dialog'
    });
  }

  public openNotifications(): void {
    this.dialog.open(AppNotificationDialogComponent, {autoFocus: 'dialog'});
  }
}
