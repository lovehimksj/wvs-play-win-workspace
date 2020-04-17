import { Body, Controller, Get, HttpStatus, Logger, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { PlayerMasterService } from './player-master.service';
import {
  CouncilMaster,
  PlayerMasterDto,
  SuccessResponseModel,
  TeamMasterDto
} from '@wvs-play-win-workspace/api-interfaces';
import { UtilService } from '../../util/util.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiTags ('player master')
@Controller ('player')
export class PlayerMasterController {

  constructor (private readonly playerMasterService: PlayerMasterService, private readonly utilService: UtilService) {
  }


  @Get ()
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async findAll (@Res () res: Response): Promise<SuccessResponseModel<Array<PlayerMasterDto>>> {
    try {
      let result: Array<PlayerMasterDto>;
      const response: SuccessResponseModel<Array<PlayerMasterDto>> = new SuccessResponseModel<Array<PlayerMasterDto>> ();
      result = await this.playerMasterService.getAll ();
      if (result && result.length > 0) {
        response.status = HttpStatus.OK;
        response.data = result;
        response.message = 'Players List Fetched';
      } else {
        response.status = HttpStatus.NO_CONTENT;
        response.data = result;
        response.message = 'No Player is available';
      }
      return res.status (HttpStatus.OK).send (response);
    } catch (e) {
      throw new Error (e);
    }
  }


  @Post ()
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
      fileFilter: UtilService.imageFileFilter,
    })
  )
  @ApiConsumes ('multipart/form-data')
  @ApiImplicitFile ({ name: 'file', required: false })
  async saveTeam (@UploadedFile () file, @Body () playerMasterDto: PlayerMasterDto, @Res () res: Response) {
    console.log (JSON.stringify (file));
    const result = await this.playerMasterService.savePlayer (playerMasterDto, file.filename);
    Logger.log (JSON.stringify (result));
    const successResponseModel: SuccessResponseModel<Array<CouncilMaster>> = new SuccessResponseModel<Array<CouncilMaster>> (null, HttpStatus.OK, 'Game is fetched Successfully');
    res.status (HttpStatus.OK).send (successResponseModel);
  }

}
