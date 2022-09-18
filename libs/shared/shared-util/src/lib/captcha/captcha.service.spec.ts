/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CaptchaService } from './captcha.service';
describe('CaptchaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CaptchaService],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should be created', inject(
    [CaptchaService],
    (service: CaptchaService) => {
      expect(service).toBeTruthy();
    }
  ));
});
