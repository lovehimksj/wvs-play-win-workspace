import { PlayerServerModel } from "@wvs-play-win-workspace/backend";

export class SetPlayerList {
  public static readonly type = '[SetPlayerList] Set Player List';
  constructor(public playerList: Array<PlayerServerModel>) { }
}