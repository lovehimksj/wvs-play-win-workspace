export interface Authentication {
  email: string;
  password: string;
}

export interface UserAuthenticationModel {
  firstName?: string;
  lastName?: string;
  userId?: string;
  email?: string;
  avatar?: string;
  mobile?: string;
  expireOn?: string;
  createdOn?: string;
  token?: string;
  validity?: number;
  lastLoginTime?: Date;
}
