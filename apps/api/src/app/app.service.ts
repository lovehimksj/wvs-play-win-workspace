import { Injectable } from '@nestjs/common';
import { SpecialityCodeMaster } from '@wvs-play-win-workspace/api-interfaces';

@Injectable()
export abstract class AppService {
  abstract getSpecialityMaster(): Promise<Array<SpecialityCodeMaster>>
}
