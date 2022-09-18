/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseModel<T> {
  @ApiProperty({ required: false })
  data: T | Array<T> | string;
  @ApiProperty({ required: false, enum: HttpStatus })
  status: HttpStatus;
  @ApiProperty({ required: false })
  message: string;

  constructor(
    data?: T | Array<T> | string,
    status?: HttpStatus,
    message?: string
  ) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
}
