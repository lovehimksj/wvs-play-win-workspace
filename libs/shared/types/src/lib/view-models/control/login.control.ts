/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { InputFieldValidation } from '../constant/input-field-validation.contant';

export class LoginControl {
  captchaCode = '';
  loginForm: UntypedFormGroup;
  isEmailRequired = false;
  isPasswordRequired = false;
  isCaptchaRequired = false;
  isForgotPassword = false;
  isRememberMe = false;
  captchaImage = '';
  isCaptchaLoaded = false;

  constructor (private fb: UntypedFormBuilder) {
  }

  generateForm () {
    this.loginForm = this.fb.group ({
      userName: new UntypedFormControl ('', [Validators.maxLength (InputFieldValidation.USER_NAME_MAX_LENGTH)]),
      password: new UntypedFormControl ('', [Validators.maxLength (InputFieldValidation.USER_NAME_MAX_LENGTH)]),
      captcha: new UntypedFormControl ('')
    });
    if (this.isCaptchaRequired) {
      this.loginForm.controls['captcha'].setValidators (Validators.required);
    }
    if(this.isEmailRequired) {
      this.loginForm.controls['userName'].setValidators (Validators.required);
    }
    if(this.isPasswordRequired) {
      this.loginForm.controls['password'].setValidators (Validators.required);
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
