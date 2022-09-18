import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { PlayerMasterService } from './player-master.service';
import {
  CouncilMaster,
  PlayerMasterDto,
  SuccessResponseModel,
  TeamMasterDto,
} from '@wvs-play-win-workspace/api-interfaces';
import { UtilService } from '../../util/util.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { AppLoggerService } from '../../app-logger.service';

@ApiTags('player master')
@Controller('player')
export class PlayerMasterController {
  constructor(
    private readonly playerMasterService: PlayerMasterService,
    private readonly logger: AppLoggerService
  ) {}

  @Get()
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  async findAll(@Res() res: Response): Promise<void> {
    try {
      this.playerMasterService
        .getAll()
        .then((value) => {
          this.logger.log(typeof value, 'value');
          if (value && value.length > 0) {
            const successResponseModel: SuccessResponseModel<
              Array<PlayerMasterDto>
            > = new SuccessResponseModel<Array<PlayerMasterDto>>(
              value,
              HttpStatus.OK,
              'Players List Fetched'
            );
            res.status(HttpStatus.OK).send(successResponseModel);
          } else {
            const successResponseModel: SuccessResponseModel<
              Array<PlayerMasterDto>
            > = new SuccessResponseModel<Array<PlayerMasterDto>>(
              value,
              HttpStatus.NO_CONTENT,
              'No Player is available'
            );
            res.status(HttpStatus.OK).send(successResponseModel);
          }
        })
        .catch((reason) => {
          const successResponseModel: SuccessResponseModel<any> =
            new SuccessResponseModel<any>(
              reason,
              HttpStatus.INTERNAL_SERVER_ERROR,
              'Inrenal error'
            );
          res.status(HttpStatus.OK).send(successResponseModel);
        });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
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
  @ApiImplicitFile({ name: 'file', required: false })
  async save(
    @UploadedFile() file,
    @Body() playerMasterDto: PlayerMasterDto,
    @Res() res: Response
  ) {
    console.log(JSON.stringify(file));
    const result = await this.playerMasterService.savePlayer(
      playerMasterDto,
      file?.filename
    );
    Logger.log(JSON.stringify(result));
    const successResponseModel: SuccessResponseModel<PlayerMasterDto> =
      new SuccessResponseModel<PlayerMasterDto>(
        result,
        HttpStatus.OK,
        'Game is fetched Successfully'
      );
    res.status(HttpStatus.OK).send(successResponseModel);
  }
}
