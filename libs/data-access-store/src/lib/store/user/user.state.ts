import { State, Action, Selector, StateContext } from '@ngxs/store';
import { UserAction } from './user.actions';
import { Injectable } from '@angular/core';
import { UserAuthDataModel } from '@wvs-play-win-workspace/shared/types';
import { patch } from '@ngxs/store/operators';

export interface UserStateModel {
  userDetails: UserAuthDataModel;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    userDetails: null
  }
})

@Injectable()
export class UserState {

  @Selector()
  public static getUserState(state: UserStateModel) {
    return state.userDetails;
  }

  @Action(UserAction)
  public add(ctx: StateContext<UserStateModel>, { payload }: UserAction) {
    const stateModel = ctx.getState();
    stateModel.userDetails = payload;
    ctx.setState(
      patch({
        userDetails : {...stateModel.userDetails}
      })
    );
  }
}
