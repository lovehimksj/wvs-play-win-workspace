import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private http: HttpClient) { }

  log(error: Error): Observable<any> {
    return this.http.post('/api/app/log', {name: error.name, stack: error.stack, message: error.message})
  }
}
