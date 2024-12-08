import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  private isLoadingSignal = signal<boolean>(false);

  public show(): void {
    this.isLoadingSignal.set(true);
  }

  public hide(): void {
    this.isLoadingSignal.set(false);
  }

  public isLoading(): boolean {
    return this.isLoadingSignal();
  }

  public setLoading(value: boolean): void {
    this.isLoadingSignal.set(value);
  }
}
