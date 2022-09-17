import { TestBed } from '@angular/core/testing';

import { PlayerMapperService } from './player-mapper.service';

describe('PlayerMapperService', () => {
  let service: PlayerMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(PlayerMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
