import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
