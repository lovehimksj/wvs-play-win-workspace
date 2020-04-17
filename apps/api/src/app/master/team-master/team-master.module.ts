import { Module } from '@nestjs/common';
import { TeamMasterController } from './team-master.controller';
import { TeamMasterService } from './team-master.service';
import { TeamMasterImpService } from './team-master-imp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMaster, TeamTournamentDetail } from '@wvs-play-win-workspace/api-interfaces';
import { UtilService } from '../../util/util.service';

@Module ({
  imports: [TypeOrmModule.forFeature ([TeamMaster, TeamTournamentDetail])],
  controllers: [TeamMasterController],
  providers: [{ provide: TeamMasterService, useClass: TeamMasterImpService }, UtilService]
})
export class TeamMasterModule {
}
