import { TestBed } from '@angular/core/testing';

import { ApplicationLoaderService } from './application-loader.service';

describe('ApplicationLoaderService', () => {
  let service: ApplicationLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(ApplicationLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
