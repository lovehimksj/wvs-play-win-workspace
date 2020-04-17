import { Test, TestingModule } from '@nestjs/testing';
import { AppImplService } from './app-impl.service';

describe('AppImplService', () => {
  let service: AppImplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppImplService],
    }).compile();

    service = module.get<AppImplService>(AppImplService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
