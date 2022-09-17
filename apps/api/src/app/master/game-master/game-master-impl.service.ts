import { GameMaster, GameMasterDto } from '@wvs-play-win-workspace/api-interfaces';
import { Injectable } from '@nestjs/common';
import { GameMasterService } from './game-master.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameMasterHelperService } from './game-master-helper.service';

@Injectable()
export class GameMasterImplService implements GameMasterService {

  constructor(
    @InjectRepository(GameMaster)
    private readonly userRepository: Repository<GameMaster>,
    private readonly gameHelperService: GameMasterHelperService
    ) {}

  async getGameById (gameId: number): Promise<GameMasterDto> {
    return await this.userRepository.findOne(gameId).then((game) => this.gameHelperService.buildGameMaster(game));
  }

  

  async getAllGame(): Promise<Array<GameMasterDto>> {
    const gameList: Array<GameMasterDto> = [];
    return await this.userRepository.find({ isActive: 1}).then(
      (game: Array<GameMaster>) => {
        game.forEach((value1: GameMaster) => {
          const gameMaster: GameMasterDto = this.gameHelperService.buildGameMaster(value1)
          gameList.push(gameMaster);
        })
        return gameList;
      });
  }

  async saveGame (createCatDto: GameMasterDto): Promise<GameMasterDto> {
    const gameMaster = new GameMaster();
    gameMaster.gameDese = createCatDto.gameDescription;
    gameMaster.gameName = createCatDto.gameName;
    gameMaster.updateDate = null;
    gameMaster.createDate = new Date();
    gameMaster.isActive = 1;
    return await this.userRepository.save(createCatDto);
  }

  async deleteGame (gameId: number): Promise<GameMasterDto> {
    return await this.userRepository.softDelete({gameId: gameId}).then((game) => this.gameHelperService.buildGameMaster(game.raw));
  }

  async updateGame (updateGameDto: GameMasterDto, gameId: number): Promise<GameMasterDto> {
    const gameMaster = new GameMaster();
    gameMaster.gameId = gameId;
    gameMaster.gameDese = updateGameDto.gameDescription;
    gameMaster.gameName = updateGameDto.gameName;
    gameMaster.updateDate = new Date();
    return await this.userRepository.update({gameId: gameId},gameMaster).then((game) => this.gameHelperService.buildGameMaster(game.raw));
  }

  async updateStatus (id: number, status: number): Promise<GameMasterDto> {
    const gameMaster = new GameMaster();
    gameMaster.updateDate = new Date();
    gameMaster.isActive = status;
    return await this.userRepository.update({gameId: id},gameMaster).then((game) => this.gameHelperService.buildGameMaster(game.raw));
  }
}
