import { async, TestBed } from '@angular/core/testing';
import { DataAccessStoreModule } from './data-access-store.module';

describe('DataAccessStoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessStoreModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessStoreModule).toBeDefined();
  });
});
