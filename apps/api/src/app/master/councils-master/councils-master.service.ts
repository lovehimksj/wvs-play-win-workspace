import { Injectable } from '@nestjs/common';
import { CouncilMaster, CouncilMasterDto } from '@wvs-play-win-workspace/api-interfaces';
import { EntityManager } from 'typeorm';

@Injectable ()
export abstract class CouncilsMasterService {
  abstract getAllCouncilsByGameId (gameId: number): Promise<Array<CouncilMasterDto>>

  abstract findCouncilById (councilId: number): Promise<CouncilMasterDto>

  abstract create (data: CouncilMasterDto): Promise<CouncilMasterDto>;

  abstract getAllCouncils (): Promise<Array<CouncilMasterDto>>;

  abstract updateCouncil (councilId: number, councilDto: CouncilMasterDto): Promise<CouncilMasterDto>
}
