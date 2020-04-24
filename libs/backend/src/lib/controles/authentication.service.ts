import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../model/api-response-model';

export interface RequestModel {
  authModel: Authentication
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authentication(params: RequestModel) {
    const bodyParams = params.authModel;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<ApiResponseModel>(`/api/authentication/login`, bodyParamsWithoutUndefined);
  }
}
