import { Test, TestingModule } from '@nestjs/testing';
import { GameMasterImplService } from './game-master-impl.service';

describe('GameMasterImplService', () => {
  let service: GameMasterImplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameMasterImplService],
    }).compile();

    service = module.get<GameMasterImplService>(GameMasterImplService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
