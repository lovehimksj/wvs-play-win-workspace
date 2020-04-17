import { Test, TestingModule } from '@nestjs/testing';
import { CouncilsMasterImplService } from './councils-master-impl.service';

describe('CouncilsMasterImplService', () => {
  let service: CouncilsMasterImplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouncilsMasterImplService],
    }).compile();

    service = module.get<CouncilsMasterImplService>(CouncilsMasterImplService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
