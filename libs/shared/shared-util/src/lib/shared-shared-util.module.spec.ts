import { async, TestBed } from '@angular/core/testing';
import { SharedSharedUtilModule } from './shared-shared-util.module';

describe('SharedSharedUtilModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedSharedUtilModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedSharedUtilModule).toBeDefined();
  });
});
