import { async, TestBed } from '@angular/core/testing';
import { SharedUiKitModule } from './shared-ui-kit.module';

describe('SharedUiKitModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiKitModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiKitModule).toBeDefined();
  });
});
