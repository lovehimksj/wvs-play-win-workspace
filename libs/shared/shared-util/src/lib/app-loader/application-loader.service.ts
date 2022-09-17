import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONSTANT } from '@wvs-play-win-workspace/shared/types';

@Injectable({
  providedIn: 'root'
})
export class ApplicationLoaderService {

  constructor(private translate: TranslateService) {
  }

  setCurrentLanguage() {
    console.log(`initializeApp:: inside setTimeout`);
    const lang = this.translate.getBrowserLang();
    this.translate.addLangs(APP_CONSTANT.LANG);
    if(location.pathname === '/') {
      location.href = location.href + lang;
    }
    return () => new Promise<void>((resolve, reject) => {
      console.log(`initializeApp:: inside promise`);
      setTimeout(() => {
        this.translate.setDefaultLang(APP_CONSTANT.LANG.indexOf(lang) > -1 ? lang : APP_CONSTANT.DEFAULT_LANG);
        this.translate.use(APP_CONSTANT.LANG.indexOf(lang) > -1 ? lang : APP_CONSTANT.DEFAULT_LANG);
        resolve();
      }, 1000);
    });
  }

}
