import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AppNotificationService } from '../../../core/services/app-notification/app-notification.service';

@Component({
  selector: 'app-app-notification-dialog',
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './app-notification-dialog.component.html',
  styleUrl: './app-notification-dialog.component.scss'
})
export class AppNotificationDialogComponent {
  private notificationService = inject(AppNotificationService);
  protected notifications = this.notificationService.notifications;

  public archiveNotification(id: string): void {
    this.notificationService.archiveNotification(id);
    this.notificationService.getNotifications();
  }

  public archiveAllNotification(): void {
    this.notificationService.clearNotifications();
    this.notificationService.getNotifications();
  }
}
