import { Injectable } from '@nestjs/common';
import { GameMaster, GameMasterDto } from '@wvs-play-win-workspace/api-interfaces';

@Injectable ()
export abstract class GameMasterService {
  abstract getGameById (gameId: number): Promise<GameMasterDto>;

  abstract updateStatus (id: number, status: number): Promise<GameMasterDto>;

  abstract deleteGame (gameId: number): Promise<GameMasterDto>;

  abstract saveGame (createCatDto: GameMasterDto): Promise<GameMasterDto>;

  abstract getAllGame (): Promise<GameMasterDto[]>;

  abstract updateGame (updateCatDto: GameMasterDto, gameId: number): Promise<GameMasterDto>;
}
