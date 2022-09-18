import { UserAuthDataModel } from '../../data-model/models/auth-data-model';

export class SideNavControl {
  userDetails: UserAuthDataModel;

  constructor() {
    this.userDetails = new UserAuthDataModel();
  }
}
