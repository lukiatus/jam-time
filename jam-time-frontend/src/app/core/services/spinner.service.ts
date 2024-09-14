import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public visibility = new BehaviorSubject(false);

  public show() {
    this.visibility.next(true);
  }

  public hide() {
    this.visibility.next(false);
  }
}
