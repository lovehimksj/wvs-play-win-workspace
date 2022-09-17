import { GameMaster } from '@wvs-play-win-workspace/api-interfaces';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameMasterController } from './game-master.controller';
import { GameMasterImplService } from './game-master-impl.service';
import { GameMasterService } from './game-master.service';
import { GameMasterHelperService } from './game-master-helper.service';

@Module({
    imports: [TypeOrmModule.forFeature([GameMaster])],
    controllers: [GameMasterController],
    providers: [{provide: GameMasterService, useClass:GameMasterImplService}, GameMasterHelperService]
  })
export class GameMasterModule {}
