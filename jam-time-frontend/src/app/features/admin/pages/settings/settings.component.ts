import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../../../core/services/settings/settings.service';
import { Settings } from '../../../../core/services/settings/settings';

@Component({
  selector: 'app-settings',
  imports: [
    MatButton,
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  protected settingsForm: FormGroup;
  private fb = inject(FormBuilder);
  private settingsService = inject(SettingsService);

  public constructor() {
    this.settingsForm = this.fb.group({
      systemMessage: this.settingsService.settings.systemMessage
    })
  }

  public onSave(): void {
    const formData = this.settingsForm.value;
    const settings = {systemMessage: formData.systemMessage} as Settings;
    this.settingsService.updateSettings(settings);
  }
}
