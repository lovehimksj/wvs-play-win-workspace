import { Injectable, Logger } from '@nestjs/common';
import { TournamentMasterService } from './tournament-master.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CouncilTournamentDetail, TournamentMaster, TournamentMasterDto } from '@wvs-play-win-workspace/api-interfaces';
import { Repository } from 'typeorm';

@Injectable ()
export class TournamentMasterImplService implements TournamentMasterService {
  constructor (@InjectRepository (TournamentMaster) private readonly tournamentRepository: Repository<TournamentMaster>,
               @InjectRepository (CouncilTournamentDetail) private readonly councilTournamentDetailRepository: Repository<CouncilTournamentDetail>) {
  }

  async getAllTournament (): Promise<Array<TournamentMasterDto>> {
    return this.tournamentRepository.find ({ isActive: 1 }).then ((value: Array<TournamentMaster>) => {
      const tournamentList: Array<TournamentMasterDto> = [];
      if (value && value.length > 0) {
        value.forEach ((value1: TournamentMaster) => {
          if (value1) {
            const tournamentMaster: TournamentMasterDto = new TournamentMasterDto ();
            tournamentMaster.tournamentId = value1.tournamentId;
            tournamentMaster.tournamentName = value1.tournamentName;
            tournamentMaster.tournamentDescription = value1.tournamentDese;
            tournamentMaster.year = value1.year;
            tournamentList.push (tournamentMaster);
          }
        });
      }
      return tournamentList;
    });
  }

  async saveTournament (tournamentMasterDto: TournamentMasterDto, councilId: number): Promise<TournamentMasterDto> {
    const tournamentMaster: TournamentMaster = new TournamentMaster();
    tournamentMaster.tournamentName = tournamentMasterDto.tournamentName;
    tournamentMaster.tournamentDese = tournamentMasterDto.tournamentDescription;
    tournamentMaster.year = tournamentMasterDto.year;
    tournamentMaster.isActive = 1;
    tournamentMaster.createDate = new Date();
    const saved = await this.tournamentRepository.save(tournamentMaster, {transaction: true});
    Logger.log(JSON.stringify(saved), 'saved');
    if(saved) {
      const councilTournamentDetail: CouncilTournamentDetail = new CouncilTournamentDetail();
      councilTournamentDetail.councilId = councilId;
      councilTournamentDetail.isActive = 1;
      councilTournamentDetail.tournamentId = saved.tournamentId;
      councilTournamentDetail.createDate = new Date();
      const result = await this.councilTournamentDetailRepository.save(councilTournamentDetail, {transaction: true});
      if(result) {
        return tournamentMasterDto;
      }
    }
  }

  async updateTournament (tournamentMasterDto: TournamentMasterDto, tournamentId: number): Promise<any> {
    const tournamentMaster: TournamentMaster = await this.tournamentRepository.findOne({tournamentId: tournamentId});
    Logger.log(JSON.stringify(tournamentMaster), 'tournamentMaster');
    if(tournamentMaster) {
      tournamentMaster.tournamentDese = tournamentMasterDto.tournamentDescription;
      tournamentMaster.tournamentName = tournamentMasterDto.tournamentName;
      tournamentMaster.year = tournamentMasterDto.year;
      tournamentMaster.updateDate = new Date();
      return await this.tournamentRepository.update({tournamentId: tournamentId}, tournamentMaster);
    } else {
      return null;
    }
  }

  async getTournamentById (tournamentId: number): Promise<TournamentMasterDto> {
    const tournamentMaster: TournamentMaster = await this.tournamentRepository.findOne({tournamentId: tournamentId});
    Logger.log(JSON.stringify(tournamentMaster), 'tournamentMaster');
    if(tournamentMaster) {
      const tournamentMasterDto: TournamentMasterDto = new TournamentMasterDto ();
      tournamentMasterDto.tournamentDescription = tournamentMaster.tournamentDese;
      tournamentMasterDto.tournamentName = tournamentMaster.tournamentName;
      tournamentMasterDto.year = tournamentMaster.year;
      tournamentMasterDto.tournamentId = tournamentMaster.tournamentId;
      return tournamentMasterDto;
    } else {
      return null;
    }
  }

  async findTournamentByCouncilId (councilId: number): Promise<Array<TournamentMasterDto>> {
    const tournamentIds = await this.councilTournamentDetailRepository.find({councilId: councilId});
    if(tournamentIds && tournamentIds.length > 0) {
      const tournamentMasterList: Array<TournamentMaster> = await this.tournamentRepository.findByIds(tournamentIds);
      const tournamentMasterDtoList: Array<TournamentMasterDto> = [];
      tournamentMasterList.forEach ((tournament: TournamentMaster) => {
        if (tournament) {
          const tournamentMaster: TournamentMasterDto = new TournamentMasterDto ();
          tournamentMaster.tournamentId = tournament.tournamentId;
          tournamentMaster.tournamentName = tournament.tournamentName;
          tournamentMaster.tournamentDescription = tournament.tournamentDese;
          tournamentMaster.year = tournament.year;
          tournamentMasterDtoList.push (tournamentMaster);
        }
      });
      return tournamentMasterDtoList;
    } else {
      return null;
    }

  }
}
