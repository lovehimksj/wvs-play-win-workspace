import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginControl } from '@wvs-play-win-workspace/shared/types';
import { FormBuilder } from '@angular/forms';
import { CaptchaService } from '@wvs-play-win-workspace/shared/shared-util';

@Component ({
  selector: 'wvs-play-win-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loginControl: LoginControl;

  constructor (private http: HttpClient, private formBuilder: FormBuilder, private captchaService: CaptchaService) {
    this.loginControl = new LoginControl (this.formBuilder);
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
  }

  private generateCaptcha () {
    this.loginControl.captchaCode = this.captchaService.generateRandomText ();
    const canvas = this.captchaService.generate (`${this.loginControl.captchaCode}`).canvas;
    this.loginControl.captchaImage = CaptchaService.convertCanvasToImage (canvas);
    this.loginControl.isCaptchaLoaded = !!this.loginControl.captchaImage;
  }

  reloadCaptcha () {
    this.generateCaptcha();
  }
}
