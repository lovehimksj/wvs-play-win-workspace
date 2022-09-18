import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptchaService } from './captcha/captcha.service';

@NgModule({
  imports: [CommonModule],
  providers: [CaptchaService],
})
export class SharedSharedUtilModule {}
