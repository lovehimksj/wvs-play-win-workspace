import { Test, TestingModule } from '@nestjs/testing';
import { TournamentMasterImplService } from './tournament-master-impl.service';

describe('TournamentMasterImplService', () => {
  let service: TournamentMasterImplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentMasterImplService],
    }).compile();

    service = module.get<TournamentMasterImplService>(
      TournamentMasterImplService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
