import { Injectable } from '@nestjs/common';
import { Message } from '@wvs-play-win-workspace/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
