import { Injectable, Logger } from '@nestjs/common';
import { CouncilsMasterService } from './councils-master.service';
import { CouncilMaster, CouncilMasterDto, GameCouncilDetail } from '@wvs-play-win-workspace/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable ()
export class CouncilsMasterImplService implements CouncilsMasterService {
  constructor (@InjectRepository (CouncilMaster) private readonly councilMaster: Repository<CouncilMaster>,
               @InjectRepository (GameCouncilDetail) private readonly gameCouncils: Repository<GameCouncilDetail>) {
  }

  async getAllCouncilsByGameId (gameId: number): Promise<Array<CouncilMasterDto>> {
    try {
      const councilsIds = await this.gameCouncils.find ({ gameId: gameId });
      Logger.log (JSON.stringify (councilsIds.map (value => value.councilId)), 'councilsIds');
      return await this.councilMaster.findByIds (councilsIds).then ((value: Array<CouncilMaster>) => {
        const councilsList: Array<CouncilMasterDto> = [];
        value.forEach ((value1: CouncilMaster) => {
          const councilMasterDto: CouncilMasterDto = new CouncilMasterDto ();
          councilMasterDto.councilName = value1.councilName;
          councilMasterDto.councilDescription = value1.councilDese;
          councilMasterDto.gameId = gameId;
          councilMasterDto.councilId = value1.councilId;
          councilsList.push (councilMasterDto);
        });
        return councilsList;
      });
    } catch (e) {
      throw new Error (e);
    }
  }

  async findCouncilById (councilId: number): Promise<CouncilMasterDto> {
    return await this.councilMaster.findOne (councilId).then ((value: CouncilMaster) => {
      try {
        const councilMasterDto: CouncilMasterDto = new CouncilMasterDto ();
        councilMasterDto.councilName = value.councilName;
        councilMasterDto.councilId = value.councilId;
        councilMasterDto.councilDescription = value.councilDese;
        return councilMasterDto;
      } catch (e) {
        console.log (e);
        throw new Error (e);
      }

    });
  }

  async updateCouncil (councilId: number, councilDto: CouncilMasterDto): Promise<any> {
    try {
      const councilMaster: CouncilMaster = await this.councilMaster.findOne (councilId);
      Logger.log (JSON.stringify (councilMaster), 'Current council');
      councilMaster.councilName = councilDto.councilName;
      councilMaster.councilDese = councilDto.councilDescription;
      councilMaster.updateDate = new Date ();
      return await this.councilMaster.update ({ councilId: councilId }, councilMaster);
    } catch (e) {
      return new Error (e);
    }
  }

  async create (data: CouncilMasterDto): Promise<any> {
    Logger.log (data, 'data');
    const councilsMaster: CouncilMaster = new CouncilMaster ();
    councilsMaster.councilName = data.councilName;
    councilsMaster.councilDese = data.councilDescription;
    councilsMaster.createDate = new Date ();
    councilsMaster.isActive = 1;
    councilsMaster.updateDate = null;
    const council: CouncilMaster = await this.councilMaster.save (councilsMaster);
    Logger.log (JSON.stringify (council), 'council');
    const gameCouncilDetail: GameCouncilDetail = new GameCouncilDetail ();
    gameCouncilDetail.councilId = council.councilId;
    gameCouncilDetail.gameId = data.gameId;
    gameCouncilDetail.createDate = new Date ();
    gameCouncilDetail.isActive = 1;
    gameCouncilDetail.updateDate = null;
    await this.gameCouncils.save (gameCouncilDetail);
    return council;
  }

  async getAllCouncils (): Promise<Array<CouncilMaster>> {
    return this.councilMaster.find ();
  }

}
