import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerServerModel } from '../model/player';
import { ApiResponseModel } from '../model/api-response-model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponseModel<Array<PlayerServerModel>>> {
    return this.http.get<ApiResponseModel<Array<PlayerServerModel>>>(
      `/api/player`
    );
  }
}
