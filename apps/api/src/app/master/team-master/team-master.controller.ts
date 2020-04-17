import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CouncilMaster, SuccessResponseModel, TeamMasterDto } from '@wvs-play-win-workspace/api-interfaces';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { diskStorage } from 'multer';
import { TeamMasterService } from './team-master.service';
import { Response } from 'express';
import { UtilService } from '../../util/util.service';

@ApiTags('Team Master')
@Controller ('team')
export class TeamMasterController {
  constructor (private readonly teamMasterService: TeamMasterService, private utilService: UtilService) {
  }

  @Get ('')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async findAll (@Res () res): Promise<void> {
    try {
      return await this.teamMasterService.getAllTeam ()
        .then ((value: Array<TeamMasterDto>) => {
          const successResponseModel: SuccessResponseModel<Array<TeamMasterDto>> = new SuccessResponseModel<Array<TeamMasterDto>> (value, HttpStatus.OK, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }

  @Get (':teamId')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async findOne (@Param ('teamId') teamId: number, @Res () res): Promise<void> {
    try {
      return await this.teamMasterService.getTeamById (teamId)
        .then ((value: TeamMasterDto) => {
          const successResponseModel: SuccessResponseModel<TeamMasterDto> = new SuccessResponseModel<TeamMasterDto> (value, HttpStatus.OK, 'Game is fetched Successfully');
          res.status (HttpStatus.OK).send (successResponseModel);
        });
    } catch (e) {
      throw new Error (e);
    }
  }

  @Get ('/teamsOfTournament/:tournamentId')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async findTeamsOfTournament (@Param ('tournamentId') tournamentId: number, @Res () res): Promise<void> {
    try {
      return await this.teamMasterService.getAllTeamsByTournament (tournamentId)
        .then ((value: Array<TeamMasterDto>) => {
          const successResponseModel: SuccessResponseModel<Array<TeamMasterDto>> = new SuccessResponseModel<Array<TeamMasterDto>> (value, HttpStatus.OK, 'Game is fetched Successfully');
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
  @ApiImplicitFile ({ name: 'file', required: true })
  async saveTeam (@UploadedFile () file, @Body () teamDto: TeamMasterDto, @Res () res: Response) {
    console.log (JSON.stringify (file));
    const result = await this.teamMasterService.saveTeam (teamDto, file.filename);
    Logger.log (JSON.stringify (result));
    const successResponseModel: SuccessResponseModel<Array<CouncilMaster>> = new SuccessResponseModel<Array<CouncilMaster>> (result, HttpStatus.OK, 'Game is fetched Successfully');
    res.status (HttpStatus.OK).send (successResponseModel);
  }

  @Put ()
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
  async updateTeam (@UploadedFile () file, @Body () teamDto: TeamMasterDto, @Query ('teamId') teamId: number, @Res () res: Response) {
    console.log (JSON.stringify (file));
    const result = await this.teamMasterService.updateTeam (teamDto, file.filename, teamId);
    Logger.log (JSON.stringify (result));
    const successResponseModel: SuccessResponseModel<Array<CouncilMaster>> = new SuccessResponseModel<Array<CouncilMaster>> (result, HttpStatus.OK, 'Game is fetched Successfully');
    res.status (HttpStatus.OK).send (successResponseModel);
  }


  @Post ('tournamentTeamMapping/:tournamentId')
  @ApiResponse ({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK
  })
  async teamTournamentMapping (@Param ('tournamentId') tournamentId: number, @Body () teamsId: Array<number>, @Res () res: Response) {
    const result = await this.teamMasterService.tournamentTeamMapping (teamsId, tournamentId);
    Logger.log (JSON.stringify (result));
    const successResponseModel: SuccessResponseModel<Array<CouncilMaster>> = new SuccessResponseModel<Array<CouncilMaster>> (result, HttpStatus.OK, 'Game is fetched Successfully');
    res.status (HttpStatus.OK).send (successResponseModel);
  }

}
