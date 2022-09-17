import { Injectable } from '@nestjs/common';
import { GameMaster, GameMasterDto } from '@wvs-play-win-workspace/api-interfaces';


@Injectable()
export class GameMasterHelperService {

    buildGameMaster(gameMaster : GameMaster): GameMasterDto {
        const gamemasterDto: GameMasterDto = new GameMasterDto();
        gamemasterDto.gameName =  gameMaster.gameName;
        gamemasterDto.gameDescription =  gameMaster.gameDese;
        gamemasterDto.gameId =  gameMaster.gameId;
        return gamemasterDto;
    }
}
