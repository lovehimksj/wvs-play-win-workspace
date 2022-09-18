import { patch } from '@ngxs/store/operators';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import {
  ApiResponseModel,
  PlayerServerModel,
  PlayerService,
} from '@wvs-play-win-workspace/backend';
import { SetPlayerList } from './master.actions';

export interface MasterStateModel {
  playerList: PlayerServerModel[];
}

@State<MasterStateModel>({
  name: 'master',
  defaults: {
    playerList: [],
  },
})
export class MasterState {
  constructor() {}
  @Selector()
  public static getPlayerList(
    state: MasterStateModel
  ): Array<PlayerServerModel> {
    return state.playerList;
  }

  @Action(SetPlayerList)
  public getAllPlayer(
    ctx: StateContext<MasterStateModel>,
    { playerList }: SetPlayerList
  ) {
    const stateModel = ctx.getState();
    stateModel.playerList = [...playerList];
    ctx.setState(
      patch({
        playerList: [...stateModel.playerList],
      })
    );
  }
}
