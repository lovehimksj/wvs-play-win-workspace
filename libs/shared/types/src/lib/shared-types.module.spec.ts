import { async, TestBed } from '@angular/core/testing';
import { SharedTypesModule } from './shared-types.module';

describe('SharedTypesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedTypesModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedTypesModule).toBeDefined();
  });
});
