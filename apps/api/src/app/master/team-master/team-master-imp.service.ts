import { Injectable } from '@nestjs/common';
import { TeamMasterService } from './team-master.service';
import { TeamMaster, TeamMasterDto, TeamTournamentDetail } from '@wvs-play-win-workspace/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable ()
export class TeamMasterImpService implements TeamMasterService {
  constructor (
    @InjectRepository (TeamMaster) private readonly teamMasterRepository: Repository<TeamMaster>,
    @InjectRepository (TeamTournamentDetail) private readonly teamTournamentDetailRepository: Repository<TeamTournamentDetail>) {
  }

  async updateTeam (teamDto: TeamMasterDto, originalname: any, teamId: number): Promise<TeamMasterDto> {
    const teamMaster: TeamMaster = await this.teamMasterRepository.findOne (teamId);
    if (teamMaster) {
      teamMaster.teamName = teamDto.teamName;
      teamMaster.teamDese = teamDto.teamDescription;
      teamMaster.teamIcon = originalname;
      teamMaster.updateDate = new Date ();
      await this.teamMasterRepository.update ({ teamId: teamId }, teamMaster);
      return teamDto;
    } else {
      return null;
    }
  }

  async getTeamById (teamId: number): Promise<TeamMasterDto> {
    return await this.teamMasterRepository.findOne (teamId).then ((teamMaster: TeamMaster) => {
      if (teamMaster) {
        const teamMasterDto: TeamMasterDto = new TeamMasterDto ();
        teamMasterDto.teamName = teamMaster.teamName;
        teamMasterDto.teamDescription = teamMaster.teamDese;
        teamMasterDto.teamIcon = teamMaster.teamIcon;
        teamMasterDto.teamId = teamMaster.teamId;
        return teamMasterDto;
      }
    });
  }

  async getAllTeam (): Promise<Array<TeamMasterDto>> {
    return await this.teamMasterRepository.find ().then ((teamMasters: Array<TeamMaster>) => {
      const teamMasterList: Array<TeamMasterDto> = [];
      if (teamMasters && teamMasters.length > 0) {
        teamMasters.forEach ((teamMaster: TeamMaster) => {
          const teamMastersDto: TeamMasterDto = new TeamMasterDto ();
          teamMastersDto.teamName = teamMaster.teamName;
          teamMastersDto.teamDescription = teamMaster.teamDese;
          teamMastersDto.teamIcon = teamMaster.teamIcon;
          teamMastersDto.teamId = teamMaster.teamId;
          teamMasterList.push (teamMastersDto);
        });
      }
      return teamMasterList;
    });
  }

  async saveTeam (teamDto: TeamMasterDto, originalname: string): Promise<TeamMasterDto> {
    const teamMaster: TeamMaster = new TeamMaster ();
    teamMaster.teamName = teamDto.teamName;
    teamMaster.teamDese = teamDto.teamDescription;
    teamMaster.teamIcon = originalname;
    teamMaster.createDate = new Date ();
    teamMaster.isActive = 1;
    return await this.teamMasterRepository.save (teamMaster).then ((value: TeamMaster) => {
      const saveMasterDto: TeamMasterDto = new TeamMasterDto ();
      saveMasterDto.teamName = value.teamName;
      saveMasterDto.teamDescription = value.teamDese;
      saveMasterDto.teamIcon = value.teamIcon;
      return saveMasterDto;
    });
  }

  async getAllTeamsByTournament (tournamentId: number): Promise<Array<TeamMasterDto>> {
    const teamIds: Array<TeamTournamentDetail> = await this.teamTournamentDetailRepository.find ({ tournamentId: tournamentId });
    const teams: Array<TeamMaster> = await this.teamMasterRepository.findByIds (teamIds);
    const teamMasters: Array<TeamMasterDto> = [];
    if (teams && teams.length > 0) {
      teams.forEach ((value: TeamMaster) => {
        const teamMasterDto: TeamMasterDto = new TeamMasterDto ();
        teamMasterDto.teamName = value.teamName;
        teamMasterDto.teamDescription = value.teamDese;
        teamMasterDto.teamIcon = value.teamIcon;
        teamMasterDto.teamId = value.teamId;
        teamMasters.push (teamMasterDto);
      });
    }
    return teamMasters;
  }

  async tournamentTeamMapping (teamsId: number[], tournamentId: number): Promise<any> {
    try {
      if(teamsId.length > 0) {
        await this.teamTournamentDetailRepository.delete({tournamentId: tournamentId});
        const teamTournamentDetailList: Array<TeamTournamentDetail> = [];
        teamsId.forEach(value => {
          const teamTournamentDetail: TeamTournamentDetail = new TeamTournamentDetail();
          teamTournamentDetail.teamId = value;
          teamTournamentDetail.tournamentId = tournamentId;
          teamTournamentDetail.isActive = 1;
          teamTournamentDetail.createDate = new Date();
          teamTournamentDetailList.push(teamTournamentDetail);
        });
        return await this.teamTournamentDetailRepository.save(teamTournamentDetailList);
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}
