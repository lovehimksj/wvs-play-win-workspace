import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ApiResponseModel,
  PlayerServerModel,
  PlayerService,
} from '@wvs-play-win-workspace/backend';
import {
  MasterState,
  SetPlayerList,
} from '@wvs-play-win-workspace/data-access-store';
import { Observable } from 'rxjs';
import { PlayerFacadeService } from './player-facade.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerFacadeImplService implements PlayerFacadeService {
  constructor(
    private readonly _playerService: PlayerService,
    private readonly _store: Store
  ) {}
  @Select(MasterState.getPlayerList) load_player_list$: Observable<
    PlayerServerModel[]
  >;
  setAllPlayer() {
    this._playerService
      .getAll()
      .subscribe((response: ApiResponseModel<Array<PlayerServerModel>>) => {
        if (response && response.status === 200) {
          if (response.data.length > 0) {
            this._store.dispatch(new SetPlayerList(response.data));
          }
        }
      });
  }
}
