import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { PlayerMasterRoutingModule } from './player-master-module-routing.module';
import { SharedUiKitModule } from '@wvs-play-win-workspace/shared/ui-kit';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, SharedUiKitModule, PlayerMasterRoutingModule],
  exports: [ListComponent],
})
export class PlayerMasterModule {}
