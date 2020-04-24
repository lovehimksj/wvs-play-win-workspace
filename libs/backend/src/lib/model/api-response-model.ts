import { HttpStatus } from '@nestjs/common';

export interface ApiResponseModel {
  data: object | Array<any> | string;
  message: string;
  status: HttpStatus;
}
