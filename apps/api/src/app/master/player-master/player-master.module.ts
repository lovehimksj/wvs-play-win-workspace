import { CacheModule, Module } from '@nestjs/common';
import { PlayerMasterController } from './player-master.controller';
import { PlayerMasterService } from './player-master.service';
import { PlayerMasterImplService } from './player-master-impl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerMaster } from '@wvs-play-win-workspace/api-interfaces';
import { UtilService } from '../../util/util.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerMaster]), CacheModule.register ({ ttl: 100000 })],
  controllers: [PlayerMasterController],
  providers: [{provide:PlayerMasterService, useClass:PlayerMasterImplService}, UtilService]
})
export class PlayerMasterModule {}
