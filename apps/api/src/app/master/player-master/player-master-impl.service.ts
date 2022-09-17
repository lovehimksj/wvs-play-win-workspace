import { APP_CONSTANT } from '@wvs-play-win-workspace/shared/types';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PlayerMasterService } from './player-master.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerMaster, PlayerMasterDto } from '@wvs-play-win-workspace/api-interfaces';
import { Repository } from 'typeorm';

@Injectable ()
export class PlayerMasterImplService implements PlayerMasterService {
  constructor (@InjectRepository (PlayerMaster) private readonly playerMasterRepository: Repository<PlayerMaster>,
               @Inject (CACHE_MANAGER) private cacheManager) {
  }

  async savePlayer (playerMasterDto: PlayerMasterDto, filename: string): Promise<PlayerMasterDto> {
    const playerMaster: PlayerMaster = new PlayerMaster(playerMasterDto);
    playerMaster.createDate = new Date();
    playerMaster.creditPoint = playerMasterDto.creditPoint;
    playerMaster.playerName = playerMasterDto.playerName;
    playerMaster.playerDese = playerMasterDto.playerDescription;
    playerMaster.playingNation = playerMasterDto.playingNation;
    playerMaster.specialityId = playerMasterDto.specialityId;
    playerMaster.pictureFileName  = filename;
    playerMaster.isActive  = APP_CONSTANT.ACTIVE_STATUS_CODE;
    try {
      return await this.playerMasterRepository.save(playerMaster)
        .then(value => new PlayerMasterDto (value))
        .catch(error => new PlayerMasterDto ());
    } catch (error) {
      throw new Error (error);
    }
    
  }

  async getAll (): Promise<Array<PlayerMasterDto>> {
    const playersList: Array<PlayerMasterDto> = [];
    return await this.playerMasterRepository.find ()
      .then ((value: Array<PlayerMaster>) => {
        if (value && value.length > 0) {
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
        }
        return playersList;
      });
  }
}
