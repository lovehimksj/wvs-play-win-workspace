import { Injectable } from '@nestjs/common';
import { TournamentMasterDto } from '@wvs-play-win-workspace/api-interfaces';

@Injectable ()
export abstract class TournamentMasterService {
  abstract getTournamentById (tournamentId: number): Promise<TournamentMasterDto>;

  abstract updateTournament (tournamentMasterDto: TournamentMasterDto, tournamentId: number): Promise<any>;

  abstract saveTournament (tournamentMasterDto: TournamentMasterDto, councilId: number): Promise<TournamentMasterDto>;

  abstract getAllTournament (): Promise<Array<TournamentMasterDto>>

  abstract findTournamentByCouncilId (councilId: number): Promise<Array<TournamentMasterDto>>;
}
