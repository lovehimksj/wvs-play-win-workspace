import { Test, TestingModule } from '@nestjs/testing';
import { GameMasterController } from './game-master.controller';

describe('GameMaster Controller', () => {
  let controller: GameMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameMasterController],
    }).compile();

    controller = module.get<GameMasterController>(GameMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
