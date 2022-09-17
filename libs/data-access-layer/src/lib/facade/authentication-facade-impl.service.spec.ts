import { TestBed } from '@angular/core/testing';

import { AuthenticationFacadeImplService } from './authentication-facade-impl.service';

describe('AuthenticationFacadeImplService', () => {
  let service: AuthenticationFacadeImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(AuthenticationFacadeImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
