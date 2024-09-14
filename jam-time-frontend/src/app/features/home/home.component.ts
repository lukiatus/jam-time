import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../core/services/spinner.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
      }, 3000);
    }
}
