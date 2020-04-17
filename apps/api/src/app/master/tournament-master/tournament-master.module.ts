import { Module } from '@nestjs/common';
import { TournamentMasterController } from './tournament-master.controller';
import { TournamentMasterService } from './tournament-master.service';
import { TournamentMasterImplService } from './tournament-master-impl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouncilTournamentDetail, TournamentMaster } from '@wvs-play-win-workspace/api-interfaces';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentMaster, CouncilTournamentDetail])],
  controllers: [TournamentMasterController],
  providers: [{provide: TournamentMasterService, useClass: TournamentMasterImplService}]
})
export class TournamentMasterModule {}
