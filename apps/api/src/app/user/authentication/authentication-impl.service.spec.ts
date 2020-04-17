import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationImplService } from './authentication-impl.service';

describe('AuthenticationImplService', () => {
  let service: AuthenticationImplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationImplService],
    }).compile();

    service = module.get<AuthenticationImplService>(AuthenticationImplService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
