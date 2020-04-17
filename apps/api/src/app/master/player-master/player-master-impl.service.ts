import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { PlayerMasterService } from './player-master.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerMaster, PlayerMasterDto } from '@wvs-play-win-workspace/api-interfaces';
import { Repository } from 'typeorm';

@Injectable ()
export class PlayerMasterImplService implements PlayerMasterService {
  constructor (@InjectRepository (PlayerMaster) private readonly playerMasterRepository: Repository<PlayerMaster>,
               @Inject (CACHE_MANAGER) private cacheManager) {
  }

  savePlayer (playerMasterDto: PlayerMasterDto, filename: any): Promise<PlayerMasterDto> {
    const playerMaster: PlayerMaster = new PlayerMaster(playerMasterDto);
    console.log(playerMaster);
    return undefined;
  }

  async getAll (): Promise<Array<PlayerMasterDto>> {
    const master = await this.cacheManager.get('master');
    Logger.log(JSON.stringify(master), 'master');
    return await this.playerMasterRepository.find ({ isActive: 1 })
      .then ((value: Array<PlayerMaster>) => {
        if (value && value.length > 0) {
          const playersList: Array<PlayerMasterDto> = [];
          value.forEach ((value1: PlayerMaster) => {
            const playerMasterDto: PlayerMasterDto = new PlayerMasterDto ();
            playerMasterDto.playerName = value1.playerName;
            playerMasterDto.playerDescription = value1.playerDese;
            playerMasterDto.creditPoint = value1.creditPoint;
            playerMasterDto.earnPoint = value1.earnPoint;
            playerMasterDto.playingNation = value1.playingNation;
            playerMasterDto.pictureFileName = value1.pictureFileName;
            playerMasterDto.playerId = value1.playerId;
            playerMasterDto.speciality = value1.playingNation;
            playersList.push (playerMasterDto);
          });
        } else {
          return null;
        }
      });
  }
}
