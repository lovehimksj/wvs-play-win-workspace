import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Injectable,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UtilService } from '../../util/util.service';
import { ApiConsumes, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticationDto,
  SuccessResponseModel,
  UserDto,
  UserTokenDto,
} from '@wvs-play-win-workspace/api-interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { AppLoggerService } from '../../app-logger.service';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@ApiTags('Authentication Module')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private myLogger: AppLoggerService
  ) {
    this.myLogger.setContext('authentication');
  }

  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/',
        filename: UtilService.editFileName,
      }),
      fileFilter: UtilService.imageFileFilter,
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true })
  @Post('create')
  async createUser(
    @UploadedFile() file,
    @Body() userDto: UserDto,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this.authenticationService.saveUser(
        userDto,
        file.filename
      );
      if (result) {
        const successResponseModel: SuccessResponseModel<any> =
          new SuccessResponseModel<any>(
            result,
            HttpStatus.OK,
            'User is added Successfully'
          );
        res.status(HttpStatus.OK).send(successResponseModel);
      } else {
        const successResponseModel: SuccessResponseModel<any> =
          new SuccessResponseModel<any>(
            null,
            HttpStatus.OK,
            'User is already exist with same record'
          );
        res.status(HttpStatus.OK).send(successResponseModel);
      }
    } catch (e) {
      console.log(e);
      throw new HttpErrorResponse(e);
    }
  }

  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  @Post('login')
  async authenticateUser(
    @Body() authenticationDto: AuthenticationDto,
    @Res() res: Response
  ): Promise<any> {
    try {
      const isLoggedIn: UserTokenDto =
        await this.authenticationService.loginUser(authenticationDto);
      if (isLoggedIn) {
        const successResponseModel: SuccessResponseModel<UserTokenDto> =
          new SuccessResponseModel<UserTokenDto>(
            isLoggedIn,
            HttpStatus.OK,
            'User is logged in Successfully'
          );
        res.status(HttpStatus.OK).send(successResponseModel);
      } else {
        const successResponseModel: SuccessResponseModel<any> =
          new SuccessResponseModel<any>(
            null,
            HttpStatus.OK,
            'User does not exist with same record'
          );
        res.status(HttpStatus.OK).send(successResponseModel);
      }
    } catch (e) {
      throw new HttpErrorResponse(e);
    }
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Custom header',
  })
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validateUser(@Req() req, @Res() res: Response): Promise<any> {
    try {
      const isTokenValid = !!req.user;
      const token = { isValid: isTokenValid, user: req.user };
      if (token) {
        res
          .status(HttpStatus.OK)
          .send(
            new SuccessResponseModel<any>(token, HttpStatus.OK, 'Valid User')
          );
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .send(
            new SuccessResponseModel<any>(
              token,
              HttpStatus.UNAUTHORIZED,
              'Invalid User'
            )
          );
      }
    } catch (e) {
      console.log(JSON.stringify(e));
      throw new Error(e);
    }
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Custom header',
  })
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req, @Res() res: Response): Promise<any> {
    try {
      const user = req.user;
      if (user) {
        const userProfile = await this.authenticationService.getProfile(
          user.userId
        );
        if (userProfile) {
          const response: SuccessResponseModel<UserDto> =
            new SuccessResponseModel<UserDto>(
              userProfile,
              HttpStatus.OK,
              'User profile found'
            );
          res.status(HttpStatus.OK).send(response);
        } else {
          const response: SuccessResponseModel<UserDto> =
            new SuccessResponseModel<UserDto>(
              null,
              HttpStatus.NO_CONTENT,
              'User profile not found'
            );
          res.status(HttpStatus.OK).send(response);
        }
      } else {
        const response: SuccessResponseModel<UserDto> =
          new SuccessResponseModel<UserDto>(
            null,
            HttpStatus.UNAUTHORIZED,
            'User profile found'
          );
        res.status(HttpStatus.OK).send(response);
      }
    } catch (e) {
      throw new HttpErrorResponse(e);
    }
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Custom header',
  })
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateUser(
    @Req() req,
    @Body() user: UserDto,
    @Res() res: Response
  ): Promise<any> {
    try {
      const isTokenValid = !!req.user;
      if (isTokenValid) {
        Logger.log(req.user);
        const userUpdated = await this.authenticationService.updateProfile(
          user,
          req.user.userId
        );
        if (userUpdated) {
          res
            .status(HttpStatus.OK)
            .send(
              new SuccessResponseModel<any>(
                userUpdated,
                HttpStatus.OK,
                'Valid User'
              )
            );
        } else {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .send(
              new SuccessResponseModel<any>(
                null,
                HttpStatus.NO_CONTENT,
                'Invalid User'
              )
            );
        }
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .send(
            new SuccessResponseModel<any>(
              null,
              HttpStatus.UNAUTHORIZED,
              'Invalid User'
            )
          );
      }
    } catch (e) {
      throw new HttpErrorResponse(e);
    }
  }

  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  @Post('otp/:mobileNumber')
  async sendOtp(
    @Param('mobileNumber') mobileNumber: string,
    @Res() res: Response
  ): Promise<any> {
    try {
      const otp = Math.floor(900000 + Math.random() * 99999);
      Logger.log(`Your OTP for ${mobileNumber} is ${otp}`, 'this', true);
      // const urlParameters = {};
      // urlParameters["apikey"] = 'P812VH05617SLD9YRVYZVERPJHIXB58G';
      // urlParameters["secret"] = 'G63FX733YD0FEGW5';
      // urlParameters["usetype"] = 'stage';
      // urlParameters["phone"] =  mobileNumber;
      // urlParameters["message"] =  'message';
      // urlParameters["senderid"] =  'wvs';
      // Logger.log (urlParameters);
      //
      // const newUrl = 'http://www.sms4india.com' + "/api/v1/sendCampaign";
      // // send data
      // const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      // this.httpService.post(newUrl,JSON.stringify(urlParameters), options).subscribe(value => {
      //   console.error (value.data);
      //
      // }, error => {
      //   console.error (error);
      // });
      // const smsRes = await sms.send(cookie, '+91' + mobileNumber, 'asdfghj'); //sends sms (promise)
      // Logger.log(smsRes);
      res
        .status(200)
        .send(
          new SuccessResponseModel<any>(
            otp.toString(),
            HttpStatus.OK,
            'OTP sent successfully'
          )
        );
    } catch (e) {
      Logger.error(e.message);
      throw new HttpErrorResponse(e);
    }
  }
}
