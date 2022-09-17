import { Injectable } from '@nestjs/common';
import { AuthenticationDto, UserDto, UserTokenDto, Users } from '@wvs-play-win-workspace/api-interfaces';
import { UpdateResult } from 'typeorm';

@Injectable ()
export abstract class AuthenticationService {
  abstract getProfile (userId: string): Promise<UserDto>;

  abstract loginUser (authenticationDto: AuthenticationDto): Promise<UserTokenDto>;

  abstract saveUser (userDto: UserDto, filename: string): Promise<Users>;

  abstract updateProfile (user: UserDto, userId: string): Promise<UpdateResult>;
}
