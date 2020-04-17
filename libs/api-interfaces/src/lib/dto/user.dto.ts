/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty ({readOnly:true, required: false })
  userId: string;

  @ApiProperty({required: true })
  email: string | null;

  @ApiProperty({required: true })
  firstName: string | null;

  @ApiProperty({required: true })
  lastName: string | null;

  @ApiProperty({required: false, readOnly:true })
  avatar: string | null;

  @ApiProperty({required: true })
  mobile: string | null;

  @ApiProperty({readOnly:true, required: true })
  password: string | null;

  @ApiProperty({readOnly:true, required: false })
  lastLoginTime: Date;

}

export class AuthenticationDto {
  @ApiProperty({required: true })
  email: string | null;

  @ApiProperty({required: true })
  password: string | null;
}
