import { TestBed } from '@angular/core/testing';
import { PlayerFacadeImplService } from './player-facade-impl.service';


describe('PlayerFacadeImplService', () => {
  let service: PlayerFacadeImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(PlayerFacadeImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
