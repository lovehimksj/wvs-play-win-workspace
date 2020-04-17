import { Test, TestingModule } from '@nestjs/testing';
import { CouncilsMasterController } from './councils-master.controller';

describe('CouncilsMaster Controller', () => {
  let controller: CouncilsMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouncilsMasterController],
    }).compile();

    controller = module.get<CouncilsMasterController>(CouncilsMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
