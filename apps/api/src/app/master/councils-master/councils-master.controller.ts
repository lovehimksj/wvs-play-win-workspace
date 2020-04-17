import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CouncilMaster, CouncilMasterDto, SuccessResponseModel } from '@wvs-play-win-workspace/api-interfaces';
import { CouncilsMasterService } from './councils-master.service';

@ApiTags ('councils master')
@Controller ('council')
export class CouncilsMasterController {

  constructor (private councilsMasterService: CouncilsMasterService) {
  }

  @Get ('')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async findAll (@Res () res): Promise<void> {
    try {
      return await this.councilsMasterService.getAllCouncils ()
        .then ((value: Array<CouncilMaster>) => {
          const successResponseModel: SuccessResponseModel<Array<CouncilMaster>> = new SuccessResponseModel<Array<CouncilMaster>> (value, HttpStatus.OK, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }

  @Get(':councilId')
  @ApiResponse({})
  getCouncil(@Param('councilId') councilId: number, @Res () res: Response): Promise<void> {
    try {
      return this.councilsMasterService.findCouncilById(councilId).then (value => {
        const successResponseModel: SuccessResponseModel<CouncilMaster> = new SuccessResponseModel<Array<any>> ();
        if (Object.entries (value).length === 0) {
          successResponseModel.data = null;
          successResponseModel.status = HttpStatus.BAD_REQUEST;
          successResponseModel.message = 'Invalid Request';
        } else {
          successResponseModel.data = value;
          successResponseModel.status = HttpStatus.OK;
          successResponseModel.message = 'Game is fetched Successfully';
        }
        res.status (HttpStatus.OK).send (successResponseModel);
      });
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
  async saveCouncil (@Body () councilMasterDto: CouncilMasterDto, @Res () res: Response): Promise<void> {
    return this.councilsMasterService.create (councilMasterDto).then (value => {
      const successResponseModel: SuccessResponseModel<CouncilMaster> = new SuccessResponseModel<Array<any>> ();
      if (Object.entries (value).length === 0) {
        successResponseModel.data = null;
        successResponseModel.status = HttpStatus.BAD_REQUEST;
        successResponseModel.message = 'Invalid Request';
      } else {
        successResponseModel.data = value;
        successResponseModel.status = HttpStatus.OK;
        successResponseModel.message = 'Game is fetched Successfully';
      }
      res.status (HttpStatus.OK).send (successResponseModel);
    });
  }


  @Put()
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async updateCouncil(@Query('id') councilId: number, @Body() councilDto: CouncilMasterDto, @Res() res: Response): Promise<void> {
    return this.councilsMasterService.updateCouncil(councilId, councilDto).then (value => {
      const successResponseModel: SuccessResponseModel<CouncilMaster> = new SuccessResponseModel<Array<any>> ();
      if (Object.entries (value).length === 0) {
        successResponseModel.data = null;
        successResponseModel.status = HttpStatus.BAD_REQUEST;
        successResponseModel.message = 'Invalid Request';
      } else {
        successResponseModel.data = value;
        successResponseModel.status = HttpStatus.OK;
        successResponseModel.message = 'Game is fetched Successfully';
      }
      res.status (HttpStatus.OK).send (successResponseModel);
    });
  }


  @Put (':gameId')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async findCouncilByGame (@Param('gameId') gameId: number, @Res () res): Promise<void> {
    try {
      return await this.councilsMasterService.getAllCouncilsByGameId (gameId)
        .then ((value: Array<CouncilMasterDto>) => {
          const successResponseModel: SuccessResponseModel<Array<CouncilMasterDto>> = new SuccessResponseModel<Array<CouncilMasterDto>> (value, HttpStatus.OK, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }
}
