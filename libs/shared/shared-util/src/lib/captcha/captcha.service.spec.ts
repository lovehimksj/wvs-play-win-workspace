import { TestBed, inject } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {CaptchaService} from './captcha.service';
describe('CaptchaImplService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
      providers: [CaptchaService]
    });
  });

  it('should be created', inject([CaptchaService], (service: CaptchaService) => {
    expect(service).toBeTruthy();
  }));
});
