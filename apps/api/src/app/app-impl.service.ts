import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class AppImplService implements AppService {
  constructor() {}
}
