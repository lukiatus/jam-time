import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from "../../core/services/spinner.service";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
  public authService = inject(AuthenticationService);
  private spinnerService = inject(SpinnerService);

  public ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 3000);
  }
}
