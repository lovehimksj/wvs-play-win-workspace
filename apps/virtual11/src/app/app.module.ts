import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedUiKitModule } from '@wvs-play-win-workspace/shared/ui-kit';
import {
  ApplicationLoaderService,
  CaptchaService, GlobalErrorHandlerService,
  HttpInterceptorService
} from '@wvs-play-win-workspace/shared/shared-util';
import { DataAccessLayerModule } from '@wvs-play-win-workspace/data-access-layer';
import { DataAccessStoreModule } from '@wvs-play-win-workspace/data-access-store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

export function HttpLoaderFactory (http: HttpClient) {
  return new TranslateHttpLoader (http, './assets/i18n/', '.json');
}

function AppLoaderFactory (appLoader: ApplicationLoaderService) {
  return appLoader.setCurrentLanguage ();
}

@NgModule ({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedUiKitModule,
    TranslateModule.forRoot ({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    DataAccessStoreModule,
    DataAccessLayerModule
  ],
  providers: [
    ApplicationLoaderService,
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    { provide: APP_INITIALIZER, useFactory: AppLoaderFactory, deps: [ApplicationLoaderService], multi: true },
    CaptchaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
