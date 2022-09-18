/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { GameMasterService } from './game-master.service';
import {
  GameMasterDto,
  SuccessResponseModel,
} from '@wvs-play-win-workspace/api-interfaces';
import {
  ApiCreatedResponse,
  ApiGoneResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('game master')
@Controller('game')
export class GameMasterController {
  constructor(private gameMaster: GameMasterService) {}

  @Get('')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  async findAll(@Res() res): Promise<void> {
    try {
      return await this.gameMaster.getAllGame().then((value) => {
        const successResponseModel: SuccessResponseModel<Array<GameMasterDto>> =
          new SuccessResponseModel<Array<GameMasterDto>>(
            value,
            HttpStatus.OK,
            'Game is fetched Successfully'
          );
        res.status(HttpStatus.OK).send(successResponseModel);
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  saveGame(@Body() createCatDto: GameMasterDto, @Res() res: Response) {
    try {
      this.gameMaster
        .saveGame(createCatDto)
        .then((value) => {
          const successResponseModel: SuccessResponseModel<GameMasterDto> =
            new SuccessResponseModel<GameMasterDto>(
              value,
              HttpStatus.OK,
              'Game is Created Successfully'
            );
          res.status(HttpStatus.OK).send(successResponseModel);
        })
        .catch((reason) => {
          console.log(reason);
        });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Delete(':gameId')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  async deleteGame(@Param('gameId') gameId: number, @Res() res) {
    try {
      this.gameMaster
        .deleteGame(gameId)
        .then((value) => {
          const successResponseModel: SuccessResponseModel<string> =
            new SuccessResponseModel<string>(
              null,
              HttpStatus.OK,
              'Game is deleted successfully'
            );
          res.status(HttpStatus.OK).send(successResponseModel);
        })
        .catch((reason) => {});
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  update(
    @Query('gameId') gameId: number,
    @Body() updateCatDto: GameMasterDto,
    @Res() res
  ) {
    try {
      this.gameMaster
        .updateGame(updateCatDto, gameId)
        .then((value) => {
          const successResponseModel: SuccessResponseModel<string> =
            new SuccessResponseModel<string>(
              null,
              HttpStatus.OK,
              'Game is modified successfully'
            );
          res.status(HttpStatus.OK).send(successResponseModel);
        })
        .catch((reason) => {});
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  changeStatus(
    @Query('id') id: number,
    @Query('status') status: number,
    @Res() res: Response
  ) {
    try {
      this.gameMaster
        .updateStatus(id, status)
        .then((value) => {
          const successResponseModel: SuccessResponseModel<string> =
            new SuccessResponseModel<string>(
              null,
              HttpStatus.OK,
              'Status changed successfully'
            );
          res.status(HttpStatus.OK).send(successResponseModel);
        })
        .catch((reason) => {});
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':gameId')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  getGame(@Param('gameId') gameId: number, @Res() res: Response) {
    try {
      this.gameMaster
        .getGameById(gameId)
        .then((value) => {
          Logger.log(typeof value, 'value');
          if (value) {
            const successResponseModel: SuccessResponseModel<GameMasterDto> =
              new SuccessResponseModel<GameMasterDto>(
                value,
                HttpStatus.OK,
                'Status changed successfully'
              );
            res.status(HttpStatus.OK).send(successResponseModel);
          } else {
            const successResponseModel: SuccessResponseModel<null> =
              new SuccessResponseModel<null>(
                null,
                HttpStatus.NO_CONTENT,
                'Status changed successfully'
              );
            res.status(HttpStatus.OK).send(successResponseModel);
          }
        })
        .catch((reason) => {
          const successResponseModel: SuccessResponseModel<any> =
            new SuccessResponseModel<any>(
              reason,
              HttpStatus.INTERNAL_SERVER_ERROR,
              'Status changed successfully'
            );
          res.status(HttpStatus.OK).send(successResponseModel);
        });
    } catch (e) {
      throw new Error(e);
    }
  }
}
