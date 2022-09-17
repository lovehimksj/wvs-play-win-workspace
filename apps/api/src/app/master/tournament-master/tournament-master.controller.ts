import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseModel, TournamentMasterDto } from '@wvs-play-win-workspace/api-interfaces';
import { TournamentMasterService } from './tournament-master.service';
import { Response } from 'express';


@ApiTags ('tournament master')
@Controller ('tournament')
export class TournamentMasterController {
  constructor (private tournamentMasterService: TournamentMasterService) {
  }

  @Get ('')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async findAll (@Res () res): Promise<void> {
    try {
      return await this.tournamentMasterService.getAllTournament ()
        .then ((value: Array<TournamentMasterDto>) => {
          if (value.length > 0) {
            const successResponseModel: SuccessResponseModel<Array<TournamentMasterDto>> = new SuccessResponseModel<Array<TournamentMasterDto>> (value, HttpStatus.OK, 'Game is fetched Successfully');
            res.status (HttpStatus.OK).send (successResponseModel);
          } else {
            const successResponseModel: SuccessResponseModel<Array<TournamentMasterDto>> = new SuccessResponseModel<Array<TournamentMasterDto>> (value, HttpStatus.NO_CONTENT, 'No tournament is found');
            res.status (HttpStatus.OK).send (successResponseModel);
          }
        }).catch (reason => {
          const successResponseModel: SuccessResponseModel<Array<TournamentMasterDto>> = new SuccessResponseModel<Array<TournamentMasterDto>> (null, HttpStatus.INTERNAL_SERVER_ERROR, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }

  @Get (':tournamentId')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async findTournament (@Param('tournamentId') tournamentId: number, @Res () res): Promise<void> {
    try {
      return await this.tournamentMasterService.getTournamentById (tournamentId)
        .then ((value: TournamentMasterDto) => {
          if (value) {
            const successResponseModel: SuccessResponseModel<TournamentMasterDto> = new SuccessResponseModel<TournamentMasterDto> (value, HttpStatus.OK, 'Game is fetched Successfully');
            res.status (HttpStatus.OK).send (successResponseModel);
          } else {
            const successResponseModel: SuccessResponseModel<TournamentMasterDto> = new SuccessResponseModel<TournamentMasterDto> (value, HttpStatus.NO_CONTENT, 'No tournament is found');
            res.status (HttpStatus.OK).send (successResponseModel);
          }
        }).catch (reason => {
          const successResponseModel: SuccessResponseModel<TournamentMasterDto> = new SuccessResponseModel<TournamentMasterDto> (null, HttpStatus.INTERNAL_SERVER_ERROR, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }


  @Post ('')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async createTournament (@Query ('councilId') councilId: number, @Body () tournamentMasterDto: TournamentMasterDto, @Res () res: Response): Promise<void> {
    try {
      return await this.tournamentMasterService.saveTournament (tournamentMasterDto, councilId)
        .then ((value: TournamentMasterDto) => {
          const successResponseModel: SuccessResponseModel<TournamentMasterDto> = new SuccessResponseModel<TournamentMasterDto> (value, HttpStatus.OK, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        }).catch (reason => {
          const successResponseModel: SuccessResponseModel<any> = new SuccessResponseModel<any> (null, HttpStatus.INTERNAL_SERVER_ERROR, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }

  @Put ('')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async updateTournament (@Query('tournamentId') tournamentId: number, @Body () tournamentMasterDto: TournamentMasterDto, @Res () res: Response): Promise<void> {
    try {
      return await this.tournamentMasterService.updateTournament (tournamentMasterDto, tournamentId)
        .then ((value: TournamentMasterDto) => {
          Logger.log(JSON.stringify(value), 'value');
          const successResponseModel: SuccessResponseModel<TournamentMasterDto> = new SuccessResponseModel<TournamentMasterDto> (null, HttpStatus.OK, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        }).catch (reason => {
          const successResponseModel: SuccessResponseModel<any> = new SuccessResponseModel<any> (null, HttpStatus.INTERNAL_SERVER_ERROR, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }

  @Put (':councilId')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async getTournamentByCouncil (@Param('councilId') councilId: number, @Body () tournamentMasterDto: TournamentMasterDto, @Res () res: Response): Promise<void> {
    try {
      return await this.tournamentMasterService.findTournamentByCouncilId (councilId)
        .then ((value: Array<TournamentMasterDto>) => {
          Logger.log(JSON.stringify(value), 'value');
          const successResponseModel: SuccessResponseModel<Array<TournamentMasterDto>> = new SuccessResponseModel<Array<TournamentMasterDto>> (value, HttpStatus.OK, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        }).catch (reason => {
          const successResponseModel: SuccessResponseModel<any> = new SuccessResponseModel<any> (null, HttpStatus.INTERNAL_SERVER_ERROR, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }
}


