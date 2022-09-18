import { async, TestBed } from '@angular/core/testing';
import { DataAccessLayerModule } from './data-access-layer.module';

describe('DataAccessLayerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessLayerModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessLayerModule).toBeDefined();
  });
});
