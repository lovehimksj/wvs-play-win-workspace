import { Body, Controller, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UtilService } from '../../util/util.service';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import {
  AuthenticationDto,
  CouncilMaster,
  SuccessResponseModel,
  UserDto
} from '@wvs-play-win-workspace/api-interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';


@Controller ('authentication')
export class AuthenticationController {

  constructor (private readonly authenticationService: AuthenticationService, private readonly utilService: UtilService) {
  }

  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  @UseInterceptors (
    FileInterceptor ('file', {
      storage: diskStorage ({
        destination: './files/',
        filename: UtilService.editFileName
      }),
      fileFilter: UtilService.imageFileFilter
    })
  )
  @ApiConsumes ('multipart/form-data')
  @ApiImplicitFile ({ name: 'file', required: true })
  @Post ('create')
  async createUser (@UploadedFile () file, @Body () userDto: UserDto, @Res () res: Response): Promise<any> {
    try {
      const result = await this.authenticationService.saveUser (userDto, file.filename);
      console.log (result);
      if (result) {
        const successResponseModel: SuccessResponseModel<any> = new SuccessResponseModel<any> (result, HttpStatus.OK, 'User is added Successfully');
        res.status (HttpStatus.OK).send (successResponseModel);
      } else {
        const successResponseModel: SuccessResponseModel<any> = new SuccessResponseModel<any> (null, HttpStatus.OK, 'User is already exist with same record');
        res.status (HttpStatus.OK).send (successResponseModel);
      }
    } catch (e) {
      console.log (e);
      throw new HttpErrorResponse (e);
    }
  }

  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  @Post ('login')
  async authenticateUser (@Body () authenticationDto: AuthenticationDto, @Res () res: Response): Promise<any> {
    try {
      const isLoggedIn = await this.authenticationService.loginUser (authenticationDto);
      if (isLoggedIn) {
        const successResponseModel: SuccessResponseModel<any> = new SuccessResponseModel<any> (isLoggedIn, HttpStatus.OK, 'User is added Successfully');
        res.status (HttpStatus.OK).send (successResponseModel);
      } else {
        const successResponseModel: SuccessResponseModel<any> = new SuccessResponseModel<any> (null, HttpStatus.OK, 'User is already exist with same record');
        res.status (HttpStatus.OK).send (successResponseModel);
      }
    } catch (e) {
      console.log (e);
      throw new HttpErrorResponse (e);
    }
  }
}
