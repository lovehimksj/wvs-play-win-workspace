import { UserAuthDataModel } from '@wvs-play-win-workspace/shared/types';

export class UserAction {
  public static readonly type = '[User] Add item';
  constructor(public payload: UserAuthDataModel) { }
}
