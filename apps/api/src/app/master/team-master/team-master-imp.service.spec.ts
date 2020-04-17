import { Test, TestingModule } from '@nestjs/testing';
import { TeamMasterImpService } from './team-master-imp.service';

describe('TeamMasterImpService', () => {
  let service: TeamMasterImpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMasterImpService],
    }).compile();

    service = module.get<TeamMasterImpService>(TeamMasterImpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
