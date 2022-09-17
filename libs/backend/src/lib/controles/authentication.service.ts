import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel, Authentication, UserAuthenticationModel } from '../..';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface RequestModel {
  authModel: Authentication
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authentication(params: RequestModel): Observable<ApiResponseModel<UserAuthenticationModel>> {
    const bodyParams = params.authModel;
    const bodyParamsWithoutUndefined: any = {};
    Object.entries(bodyParams || {}).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) bodyParamsWithoutUndefined[key] = value;
    });
    return this.http.post<ApiResponseModel<UserAuthenticationModel>>(`/api/authentication/login`, bodyParamsWithoutUndefined)
  }

  validateToken(): Observable<ApiResponseModel<UserAuthenticationModel>> {
    return this.http.get<ApiResponseModel<UserAuthenticationModel>>(`/api/authentication/validate`)
  }

  profile () : Observable<ApiResponseModel<UserAuthenticationModel>> {
    return this.http.get<ApiResponseModel<UserAuthenticationModel>>(`/api/authentication/profile`)
  }
}
