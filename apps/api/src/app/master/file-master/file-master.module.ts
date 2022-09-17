import { Module } from '@nestjs/common';
import { FileMasterController } from './file-master.controller';

@Module({
  controllers: [FileMasterController]
})
export class FileMasterModule {}
