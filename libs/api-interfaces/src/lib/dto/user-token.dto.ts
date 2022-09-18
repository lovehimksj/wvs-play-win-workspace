export class UserTokenDto {
  expireOn: Date;
  createdOn: Date;
  token: string;
  validity: number;

  constructor(
    expireOn: Date,
    createdOn: Date,
    token: string,
    validity: number
  ) {
    this.expireOn = expireOn;
    this.createdOn = createdOn;
    this.token = token;
    this.validity = validity;
  }
}
