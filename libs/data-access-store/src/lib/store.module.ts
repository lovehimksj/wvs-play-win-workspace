/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ngxsConfig } from './ngxs.config';
import { UserState } from './store/user/user.state';
import { MasterState } from './store/master/master.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    NgxsModule.forRoot([UserState, MasterState], ngxsConfig),
  ],
  exports: [NgxsLoggerPluginModule, NgxsReduxDevtoolsPluginModule, NgxsModule],
  providers: [],
})
export class NgxsStoreModule {}
