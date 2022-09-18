import { Injectable } from '@nestjs/common';
import { PlayerMasterDto } from '@wvs-play-win-workspace/api-interfaces';

@Injectable()
export abstract class PlayerMasterService {
  abstract savePlayer(
    playerMasterDto: PlayerMasterDto,
    filename: any
  ): Promise<PlayerMasterDto>;
  abstract getAll(): Promise<Array<PlayerMasterDto>>;
}
