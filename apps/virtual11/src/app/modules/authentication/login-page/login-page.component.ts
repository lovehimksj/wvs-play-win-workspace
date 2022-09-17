import { Component, OnInit } from '@angular/core';
import { LoginControl } from '@wvs-play-win-workspace/shared/types';
import { FormBuilder } from '@angular/forms';
import { CaptchaService } from '@wvs-play-win-workspace/shared/shared-util';
import { AuthenticationFacadeService } from '@wvs-play-win-workspace/data-access-layer';
import { Router } from '@angular/router';

@Component ({
  selector: 'wvs-play-win-workspace-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginControl: LoginControl;

  constructor (private formBuilder: FormBuilder,
               private captchaService: CaptchaService,
               private authenticationFacadeService: AuthenticationFacadeService,
               private router: Router) {
    this.loginControl = new LoginControl (this.formBuilder);
    this.loginControl.isEmailRequired = true;
    this.loginControl.isPasswordRequired = true;
    this.loginControl.isCaptchaRequired = true;
    this.loginControl.isRememberMe = true;
    this.loginControl.isForgotPassword = true;
    this.loginControl.generateForm ();
  }

  ngOnInit (): void {
    this.generateCaptcha ();
  }

  login (event: any) {
    console.log (event);
    try {
      this.authenticationFacadeService.authenticateUser (event).subscribe (
        value => {
          this.router.navigate(['en', 'admin'])
          console.log (value);
        }
      );
    } catch (e) {
      throw new Error(e)
    }

  }

  reloadCaptcha () {
    this.generateCaptcha ();
  }

  private generateCaptcha () {
    this.loginControl.captchaCode = this.captchaService.generateRandomText ();
    const canvas = this.captchaService.generate (`${this.loginControl.captchaCode}`).canvas;
    this.loginControl.captchaImage = CaptchaService.convertCanvasToImage (canvas);
    this.loginControl.isCaptchaLoaded = !!this.loginControl.captchaImage;
  }

}
