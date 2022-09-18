import { Module } from '@nestjs/common';
import { CouncilsMasterController } from './councils-master.controller';
import { CouncilsMasterService } from './councils-master.service';
import { CouncilsMasterImplService } from './councils-master-impl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CouncilMaster,
  GameCouncilDetail,
} from '@wvs-play-win-workspace/api-interfaces';

@Module({
  imports: [TypeOrmModule.forFeature([CouncilMaster, GameCouncilDetail])],
  controllers: [CouncilsMasterController],
  providers: [
    { provide: CouncilsMasterService, useClass: CouncilsMasterImplService },
  ],
})
export class CouncilsMasterModule {}
