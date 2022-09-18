import { Injectable, Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthenticationDto,
  UserDto,
  UserTokenDto,
  Users,
  Wallet,
  UserTokens,
} from '@wvs-play-win-workspace/api-interfaces';
import { Repository, UpdateResult } from 'typeorm';
import { UtilService } from '../../util/util.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationImplService implements AuthenticationService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly utilService: UtilService,
    private jwtService: JwtService,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(UserTokens)
    private readonly tokenRepository: Repository<UserTokens>
  ) {}

  async loginUser(authenticationDto: AuthenticationDto): Promise<UserTokenDto> {
    try {
      const userIsExist = await this.usersRepository.findOne({
        email: authenticationDto.email,
      });
      if (userIsExist) {
        const isPasswordMatch = await this.utilService.matchPassword(
          authenticationDto.password,
          userIsExist.password
        );
        if (isPasswordMatch) {
          // const userDto: UserDto = new UserDto();
          // userDto.email = userIsExist.email;
          // userDto.mobile = userIsExist.mobile;
          // userDto.firstName = userIsExist.firstName;
          // userDto.lastName = userIsExist.lastName;
          // userDto.avatar = userIsExist.avatar;
          // userDto.userId = userIsExist.userId;
          // userDto.lastLoginTime = new Date(userIsExist.lastLoginTime);
          const oldSession = await this.tokenRepository.findOne({
            userId: userIsExist.userId,
          });
          if (oldSession && oldSession.isActive === 1) {
            await this.tokenRepository.delete({ userId: userIsExist.userId });
          }
          const token = await this.jwtService.signAsync({
            userName: userIsExist.email,
            userId: userIsExist.userId,
          });
          const userToken: UserTokens = new UserTokens();
          userToken.createDate = new Date();
          userToken.isActive = 1;
          // userToken.loginDate = userIsExist.lastLoginTime;
          userToken.userId = userIsExist.userId;
          userToken.updateDate = null;
          userToken.expirationDate = new Date(
            new Date().setMilliseconds(60 * 60 * 1000)
          );
          userToken.token = token;
          const userTokenDto: UserTokenDto = new UserTokenDto(
            userToken.expirationDate,
            userToken.createDate,
            userToken.token,
            60 * 60 * 1000
          );
          await this.tokenRepository.save(userToken);
          // await this.usersRepository.update (userIsExist.id, { lastLoginTime: new Date () });
          return userTokenDto;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async saveUser(userDto: UserDto, filename: string): Promise<Users> {
    const isUserExist = await this.usersRepository.findOne({
      mobile: userDto.mobile,
      email: userDto.email,
    });
    if (isUserExist) return null;
    const salt = await this.utilService.getSalt(12);
    const hex = await this.utilService.hashPassword(userDto.password, salt);
    const userEntity: Users = new Users();
    userEntity.firstName = userDto.firstName;
    userEntity.lastName = userDto.lastName;
    userEntity.email = userDto.email;
    userEntity.mobile = userDto.mobile;
    userEntity.userId =
      'SW_' +
      (
        Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
      ).toUpperCase();
    userEntity.salt = salt;
    userEntity.password = hex;
    userEntity.userAvatar = filename;
    userEntity.status = 1;
    userEntity.createDate = new Date();
    const userCreated = await this.usersRepository.save(userEntity);
    const walletEntity: Wallet = new Wallet();
    walletEntity.amtInr = 0;
    walletEntity.createDate = new Date();
    walletEntity.initialAmount = 0;
    walletEntity.userId = userCreated.userId;
    walletEntity.isActive = 1;
    const wallet = this.walletRepository.save(walletEntity);
    if (wallet) {
      return userCreated;
    } else {
      return null;
    }
  }

  async getProfile(userId: string): Promise<UserDto> {
    const userIsExist = await this.usersRepository.findOne({ userId: userId });
    const userDto: UserDto = new UserDto();
    userDto.email = userIsExist.email;
    userDto.mobile = userIsExist.mobile;
    userDto.firstName = userIsExist.firstName;
    userDto.lastName = userIsExist.lastName;
    userDto.avatar = userIsExist.userAvatar;
    userDto.userId = userIsExist.userId;
    // userDto.lastLoginTime = new Date(userIsExist.lastLoginTime);
    return userDto;
  }

  async updateProfile(user: UserDto, userId: string): Promise<UpdateResult> {
    const oldUser = await this.usersRepository.findOne({ userId: userId });
    Logger.log('oldUser', JSON.stringify(oldUser), true);
    if (oldUser) {
      oldUser.email = user.email;
      oldUser.mobile = user.mobile;
      oldUser.firstName = user.firstName;
      oldUser.lastName = user.lastName;
      const updatedUser = await this.usersRepository.update(
        { userId: oldUser.userId },
        oldUser
      );
      Logger.log('updatedUser', JSON.stringify(updatedUser), true);
      return updatedUser;
    }
  }
}
