import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error): void {
    const loggingService = this.injector.get(LoggingService);
    loggingService.log(error).subscribe((value) => {
      console.log(value);
    });
    throw error;
  }
}
