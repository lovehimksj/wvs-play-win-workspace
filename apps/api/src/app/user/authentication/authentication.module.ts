import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationImplService } from './authentication-impl.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, Wallet } from '@wvs-play-win-workspace/api-interfaces';
import { UtilService } from '../../util/util.service';

@Module({
  imports: [MulterModule.register({
    dest: './files',
  }), TypeOrmModule.forFeature([Users, Wallet])],
  controllers: [AuthenticationController],
  providers: [{provide:AuthenticationService, useClass:AuthenticationImplService}, UtilService]
})
export class AuthenticationModule {}
