import { Test, TestingModule } from '@nestjs/testing';
import { TournamentMasterController } from './tournament-master.controller';

describe('TournamentMaster Controller', () => {
  let controller: TournamentMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentMasterController],
    }).compile();

    controller = module.get<TournamentMasterController>(TournamentMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
