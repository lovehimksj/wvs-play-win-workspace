/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputFieldValidation } from '../constant/input-field-validation.contant';

export class LoginControl {
  captchaCode = '';
  loginForm: FormGroup;
  isCaptchaRequired = false;
  isForgotPassword = false;
  isRememberMe = false;
  captchaImage = '';
  isCaptchaLoaded = false;

  constructor (private fb: FormBuilder) {
  }

  generateForm () {
    this.loginForm = this.fb.group ({
      userName: new FormControl ('', [Validators.required, Validators.maxLength (InputFieldValidation.USER_NAME_MAX_LENGTH)]),
      password: new FormControl ('', [Validators.required, Validators.maxLength (InputFieldValidation.USER_NAME_MAX_LENGTH)]),
      captcha: new FormControl ('')
    });
    if (this.isCaptchaRequired) {
      this.loginForm.controls['captcha'].setValidators (Validators.required);
    }
  }

  validateCaptcha (): boolean {
    if (this.isCaptchaRequired) {
      if (this.captchaCode !== this.loginForm.value.captcha) {
        this.loginForm.controls['captcha'].setErrors ({ MatchCaptcha: true });
      }
      return this.captchaCode === this.loginForm.value.captcha;
    }
    return !this.isCaptchaRequired;
  }

  isFormValid () {
    if (!this.validateCaptcha ()) {
      return false;
    }
    return this.loginForm.valid;
  }
}
