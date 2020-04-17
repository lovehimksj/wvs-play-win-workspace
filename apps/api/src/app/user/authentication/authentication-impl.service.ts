import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationDto, UserDto, Users, Wallet } from '@wvs-play-win-workspace/api-interfaces';
import { Repository } from 'typeorm';
import { UtilService } from '../../util/util.service';

@Injectable ()
export class AuthenticationImplService implements AuthenticationService {
  constructor (@InjectRepository (Users) private readonly usersRepository: Repository<Users>,
               private readonly utilService: UtilService,
               @InjectRepository (Wallet) private readonly walletRepository: Repository<Wallet>) {
  }

  async loginUser (authenticationDto: AuthenticationDto): Promise<UserDto> {
    try {
      const userIsExist = await this.usersRepository.findOne({email: authenticationDto.email});
      if(userIsExist) {
        const isPasswordMatch = await this.utilService.matchPassword(authenticationDto.password, userIsExist.password);
        if(isPasswordMatch) {
          const userDto: UserDto = new UserDto();
          userDto.email = userIsExist.email;
          userDto.mobile = userIsExist.mobile;
          userDto.firstName = userIsExist.firstName;
          userDto.lastName = userIsExist.lastName;
          userDto.avatar = userIsExist.avatar;
          userDto.lastLoginTime = new Date(userIsExist.lastLoginTime);
          await this.usersRepository.update(userIsExist.id, {lastLoginTime: new Date()});
          return userDto
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  async saveUser (userDto: UserDto, filename: string): Promise<Users> {
    const isUserExist = await this.usersRepository.findOne ({ mobile: userDto.mobile, email: userDto.email });
    if (isUserExist) return null;
    const salt = await this.utilService.getSalt (12);
    const hex = await this.utilService.hashPassword (userDto.password, salt);
    const userEntity: Users = new Users ();
    userEntity.firstName = userDto.firstName;
    userEntity.lastName = userDto.lastName;
    userEntity.email = userDto.email;
    userEntity.mobile = userDto.mobile;
    userEntity.userId = 'WVS_' + (Date.now ().toString (36) + Math.random ().toString (36).substr (2, 5)).toUpperCase ();
    userEntity.salt = salt;
    userEntity.password = hex;
    userEntity.avatar = filename;
    userEntity.status = 1;
    userEntity.createDate = new Date ();
    const userCreated = await this.usersRepository.save (userEntity);
    const walletEntity: Wallet = new Wallet ();
    walletEntity.amtInr = 0;
    walletEntity.createDate = new Date ();
    walletEntity.initialAmount = 0;
    walletEntity.userId = userCreated.userId;
    walletEntity.isActive = 1;
    const wallet = this.walletRepository.save (walletEntity);
    if (wallet) {
      return userCreated;
    } else {
      return null;
    }

  }

}
