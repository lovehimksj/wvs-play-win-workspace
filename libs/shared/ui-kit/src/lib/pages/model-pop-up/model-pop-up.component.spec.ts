import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPopUpComponent } from './model-pop-up.component';

describe('ModelPopUpComponent', () => {
  let component: ModelPopUpComponent;
  let fixture: ComponentFixture<ModelPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
