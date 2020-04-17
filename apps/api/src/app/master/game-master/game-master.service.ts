import { Injectable } from '@nestjs/common';
import { GameMaster, GameMasterDto } from '@wvs-play-win-workspace/api-interfaces';

@Injectable ()
export abstract class GameMasterService {
  abstract getGameById (gameId: number): Promise<GameMaster>;

  abstract updateStatus (id: number, status: number): Promise<any>;

  abstract deleteGame (gameId: number): Promise<any>;

  abstract saveGame (createCatDto: GameMasterDto): Promise<GameMaster>;

  abstract getAllGame (): Promise<GameMaster[]>;

  abstract updateGame (updateCatDto: GameMasterDto, gameId: number): Promise<any>;
}
