import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { SpecialityCodeMaster } from '@wvs-play-win-workspace/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppImplService implements AppService{

  constructor (@InjectRepository(SpecialityCodeMaster) private readonly specialityCodeMasterRepository: Repository<SpecialityCodeMaster>) {
  }

  getSpecialityMaster (): Promise<Array<SpecialityCodeMaster>> {
    return this.specialityCodeMasterRepository.find({isActive: 1});
  }
}
