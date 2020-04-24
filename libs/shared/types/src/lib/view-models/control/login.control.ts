import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginControl {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      oldPassword: new FormControl('', [Validators.required, Validators.maxLength()]),
      password: new FormControl('', [Validators.required, Validators.maxLength()]),
      confirmPass: new FormControl('', [Validators.required, Validators.maxLength()]),
    });
  }
}
