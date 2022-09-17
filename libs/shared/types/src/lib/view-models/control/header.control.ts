import { UserAuthDataModel } from "../../data-model/models/auth-data-model";

export class HeaderControl {
  pageTitle: string;
  userDetail: UserAuthDataModel;
  constructor() {
    this.userDetail = new UserAuthDataModel();
  }
}
