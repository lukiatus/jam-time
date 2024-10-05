import { Component, OnInit } from '@angular/core';
import { SpinnerService } from "../../core/services/spinner.service";
import { provideHttpClient } from "@angular/common/http";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
  public constructor(
    private spinnerService: SpinnerService,
    public authService: AuthenticationService
  ) {
  }

  public ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 3000);
  }
}
