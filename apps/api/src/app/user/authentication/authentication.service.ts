import { Injectable } from '@nestjs/common';
import { AuthenticationDto, UserDto, Users } from '@wvs-play-win-workspace/api-interfaces';

@Injectable ()
export abstract class AuthenticationService {
  abstract loginUser (authenticationDto: AuthenticationDto): Promise<UserDto>

  abstract saveUser (userDto: UserDto, filename: string): Promise<Users>
}
