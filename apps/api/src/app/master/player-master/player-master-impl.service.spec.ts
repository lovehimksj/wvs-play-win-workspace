import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMasterImplService } from './player-master-impl.service';

describe('PlayerMasterImplService', () => {
  let service: PlayerMasterImplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerMasterImplService],
    }).compile();

    service = module.get<PlayerMasterImplService>(PlayerMasterImplService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
