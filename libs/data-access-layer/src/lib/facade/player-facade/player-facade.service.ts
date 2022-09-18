import { Injectable } from '@angular/core';
import { PlayerServerModel } from '@wvs-play-win-workspace/backend';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export abstract class PlayerFacadeService {
  abstract setAllPlayer();
  abstract load_player_list$: Observable<Array<PlayerServerModel>>;
}
