import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedUiKitModule } from '@wvs-play-win-workspace/shared/ui-kit';
import { CaptchaService } from '@wvs-play-win-workspace/shared/shared-util';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, SharedUiKitModule],
  providers: [CaptchaService],
  bootstrap: [AppComponent]
})
export class AppModule {}
