import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './controles/authentication.service';
import { PlayerService } from './controles/player.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AuthenticationService, PlayerService],
})
export class BackendModule {}
