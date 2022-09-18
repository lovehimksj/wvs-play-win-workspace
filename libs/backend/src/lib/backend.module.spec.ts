import { async, TestBed } from '@angular/core/testing';
import { BackendModule } from './backend.module';

describe('BackendModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BackendModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BackendModule).toBeDefined();
  });
});
