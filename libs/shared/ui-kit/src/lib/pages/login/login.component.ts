/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LoginControl } from '@wvs-play-win-workspace/shared/types';

@Component ({
  selector: 'wvs-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Input() entity: LoginControl;
  @Output() loginSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshCaptcha: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild ('loginDataForm') loginDataForm;
  @ViewChild ('captchaImages') captchaImages: ElementRef;

  constructor () {
  }

  /** Generate captcha code */

  /*openBottomSheet(): void {
      this.bottomSheet.open(BottomSheetOverviewExampleSheetComponent);
  }*/
  login () {
    const result = this.entity.isFormValid();
    this.loginSubmit.emit(result);
  }

  reloadCaptcha () {
    this.refreshCaptcha.emit()
  }
}
