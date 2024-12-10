import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class ErrorHandlerService {
  private snackBar = inject(MatSnackBar);

  public handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {

      // HTTP errors
      if (error.error instanceof ErrorEvent) {
        this.snackBar.open(error.error.message);
      }
    }
  }
}
