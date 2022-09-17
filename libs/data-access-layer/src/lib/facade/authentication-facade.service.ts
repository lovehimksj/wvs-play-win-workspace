import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDataModel, UserAuthDataModel } from '@wvs-play-win-workspace/shared/types';

@Injectable ({
  providedIn: 'root'
})
export abstract class AuthenticationFacadeService {
  abstract getUserState: Observable<UserAuthDataModel>;

  abstract authenticateUser (authDataModel: AuthDataModel): Observable<any>;

  abstract validate (): Observable<any>;
}
