import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMasterController } from './player-master.controller';

describe('PlayerMaster Controller', () => {
  let controller: PlayerMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerMasterController],
    }).compile();

    controller = module.get<PlayerMasterController>(PlayerMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
