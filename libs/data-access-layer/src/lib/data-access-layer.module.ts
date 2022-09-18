import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationFacadeService } from './facade/authentication-facade.service';
import { AuthenticationFacadeImplService } from './facade/authentication-facade-impl.service';
import { PlayerFacadeService } from './facade/player-facade/player-facade.service';
import { PlayerFacadeImplService } from './facade/player-facade/player-facade-impl.service';
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: AuthenticationFacadeService,
      useClass: AuthenticationFacadeImplService,
    },
    { provide: PlayerFacadeService, useClass: PlayerFacadeImplService },
  ],
})
export class DataAccessLayerModule {}
