import { Module } from '@nestjs/common';
import { TournamentMasterModule } from './tournament-master/tournament-master.module';
import { GameMasterModule } from './game-master/game-master.module';
import { CouncilsMasterModule } from './councils-master/councils-master.module';
import { TeamMasterModule } from './team-master/team-master.module';
import { MulterModule } from '@nestjs/platform-express';
import { PlayerMasterModule } from './player-master/player-master.module';
@Module({
  imports: [MulterModule.register({
    dest: './files',
  }), GameMasterModule, CouncilsMasterModule, TournamentMasterModule, TeamMasterModule, PlayerMasterModule],
  controllers: [],
  providers: []
})
export class MasterModule {}
