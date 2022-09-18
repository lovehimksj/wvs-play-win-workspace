import { filter, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${sessionStorage.getItem('user_token')}`
      ),
    });
    // return next.handle(authReq);
    return next.handle(authReq).pipe(
      filter(
        (event) =>
          event instanceof HttpResponse && !authReq.url.includes('/app/')
      ),
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // redirect tp login page
              window.location.href = '/';
            }
          }
        }
      )
    );
  }
}
