import { inject, Injectable } from '@angular/core';
import { SettingsHttpService } from '../settings.http.service';
import { MatDialog } from '@angular/material/dialog';
import {
  SystemMessageDialogComponent
} from '../../../features/admin/dialogs/system-message-dialog/system-message-dialog.component';
import { Settings } from './settings';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SettingsService {
  public settings = {} as Partial<Settings> as Settings;
  private settingsHttpService = inject(SettingsHttpService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  public initialize(): void {
    this.settingsHttpService.getSettings().subscribe(settings => {
      this.settings = settings;

      if (this.settings.systemMessage) {
        this.showSystemMessage();
      }
    })
  }

  public updateSettings(settings: Settings): void {
    this.settings = settings;
    this.settingsHttpService.updateSettings(settings).subscribe(() => {
      this.snackBar.open('Módosítások mentve', 'OK', {duration: 5000});
    });
  }

  private showSystemMessage(): void {
    this.dialog.open(SystemMessageDialogComponent, {
        autoFocus: 'dialog',
        data: this.settings.systemMessage
      }
    );
  }
}
