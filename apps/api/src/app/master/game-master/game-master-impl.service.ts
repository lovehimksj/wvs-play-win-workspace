import { GameMaster, GameMasterDto } from '@wvs-play-win-workspace/api-interfaces';
import { Injectable } from '@nestjs/common';
import { GameMasterService } from './game-master.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GameMasterImplService implements GameMasterService {
  async getGameById (gameId: number): Promise<GameMaster> {
    return await this.userRepository.findOne(gameId);
  }

  constructor(
  @InjectRepository(GameMaster)
  private readonly userRepository: Repository<GameMaster>,
  ) {}

  async getAllGame(): Promise<GameMaster[]> {
    return await this.userRepository.find();
  }

  async saveGame (createCatDto: GameMasterDto): Promise<GameMaster> {
    const gameMaster = new GameMaster();
    gameMaster.gameDese = createCatDto.gameDescription;
    gameMaster.gameName = createCatDto.gameName;
    gameMaster.updateDate = null;
    gameMaster.createDate = new Date();
    gameMaster.isActive = 1;
    return await this.userRepository.save(createCatDto);
  }

  async deleteGame (gameId: number): Promise<any> {
    return await this.userRepository.delete({gameId: gameId});
  }

  async updateGame (updateGameDto: GameMasterDto, gameId: number): Promise<any> {
    const gameMaster = new GameMaster();
    gameMaster.gameId = gameId;
    gameMaster.gameDese = updateGameDto.gameDescription;
    gameMaster.gameName = updateGameDto.gameName;
    gameMaster.updateDate = new Date();
    return await this.userRepository.update({gameId: gameId},gameMaster);
  }

  async updateStatus (id: number, status: number): Promise<any> {
    const gameMaster = new GameMaster();
    gameMaster.updateDate = new Date();
    gameMaster.isActive = status;
    return await this.userRepository.update({gameId: id},gameMaster);
  }
}
