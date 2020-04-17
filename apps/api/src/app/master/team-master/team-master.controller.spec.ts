import { Test, TestingModule } from '@nestjs/testing';
import { TeamMasterController } from './team-master.controller';

describe('TeamMaster Controller', () => {
  let controller: TeamMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMasterController],
    }).compile();

    controller = module.get<TeamMasterController>(TeamMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
