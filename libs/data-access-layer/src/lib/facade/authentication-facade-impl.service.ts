import { Injectable } from '@angular/core';
import { AuthenticationFacadeService } from './authentication-facade.service';
import { Observable } from 'rxjs';
import {
  ApiResponseModel,
  Authentication,
  AuthenticationService,
  RequestModel,
  UserAuthenticationModel,
} from '@wvs-play-win-workspace/backend';
import {
  AuthDataModel,
  UserAuthDataModel,
} from '@wvs-play-win-workspace/shared/types';
import { tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import {
  UserAction,
  UserState,
} from '@wvs-play-win-workspace/data-access-store';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationFacadeImplService
  implements AuthenticationFacadeService
{
  @Select(UserState.getUserState) getUserState: Observable<UserAuthDataModel>;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store
  ) {}

  authenticateUser(authDataModel: AuthDataModel): Observable<any> {
    const authModel: Authentication = {
      email: authDataModel.userName,
      password: authDataModel.password,
    };
    const param: RequestModel = {
      authModel: authModel,
    };
    return this.authenticationService.authentication(param).pipe(
      tap((x: ApiResponseModel<any>) => {
        if (x.status === 200) {
          if (x.data !== null && x.data !== '') {
            const serverResponse: UserAuthenticationModel = x.data;
            sessionStorage.setItem('user_token', serverResponse.token);
          }
        }
      })
    );
  }

  validate(): Observable<any> {
    return this.authenticationService.validateToken().pipe(
      tap((x: ApiResponseModel<any>) => {
        if (x.status === 200) {
          if (x.data !== null && x.data !== '') {
            this.getProfile().subscribe((value) => {
              console.log(value);
            });
          }
        }
      })
    );
  }

  getProfile(): Observable<any> {
    return this.authenticationService.profile().pipe(
      tap((x: ApiResponseModel<any>) => {
        if (x.status === 200) {
          if (x.data !== null && x.data !== '') {
            const serverResponse: UserAuthenticationModel = x.data;
            const userModel: UserAuthDataModel = new UserAuthDataModel();
            userModel.userId = serverResponse.userId;
            userModel.firstName = serverResponse.firstName;
            userModel.lastLoginTime = serverResponse.lastLoginTime;
            userModel.lastName = serverResponse.lastName;
            userModel.mobile = serverResponse.mobile;
            userModel.avatar = serverResponse.avatar;
            userModel.email = serverResponse.email;
            return this.store.dispatch(new UserAction(userModel));
          }
        }
      })
    );
  }
}
