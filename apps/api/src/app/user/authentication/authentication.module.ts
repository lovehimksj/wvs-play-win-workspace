import {
  UserTokens,
  Wallet,
  Users,
} from '@wvs-play-win-workspace/api-interfaces';
import { HttpModule, Injectable, Module } from '@nestjs/common';
import {
  AuthenticationController,
  JwtAuthGuard,
} from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationImplService } from './authentication-impl.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilService } from '../../util/util.service';
import { JwtModule } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { AppLoggerService } from '../../app-logger.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret12356789',
    });
  }

  async validate(payload: any) {
    return { userName: payload.userName, userId: payload.userId };
  }
}

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forFeature([Users, Wallet, UserTokens]),
    JwtModule.register({
      secret: 'secret12356789',
      signOptions: { expiresIn: '360000s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    HttpModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    { provide: AuthenticationService, useClass: AuthenticationImplService },
    UtilService,
    JwtStrategy,
    JwtAuthGuard,
    AppLoggerService,
  ],
})
export class AuthenticationModule {}
