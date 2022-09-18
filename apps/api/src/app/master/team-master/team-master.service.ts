import { Injectable } from '@nestjs/common';
import { TeamMasterDto } from '@wvs-play-win-workspace/api-interfaces';

@Injectable()
export abstract class TeamMasterService {
  abstract tournamentTeamMapping(
    teamsId: number[],
    tournamentId: number
  ): Promise<any>;

  abstract getAllTeamsByTournament(
    tournamentId: number
  ): Promise<Array<TeamMasterDto>>;

  abstract updateTeam(
    teamDto: TeamMasterDto,
    originalname: any,
    teamId: number
  ): Promise<TeamMasterDto>;

  abstract getTeamById(teamId: number): Promise<TeamMasterDto>;

  abstract getAllTeam(): Promise<Array<TeamMasterDto>>;

  abstract saveTeam(
    teamDto: TeamMasterDto,
    originalname: string
  ): Promise<TeamMasterDto>;
}
