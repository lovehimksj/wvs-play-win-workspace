/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { Injectable, Logger } from '@nestjs/common';
import { configure, getLogger } from 'log4js';
const appLogger = getLogger('app');
@Injectable()
export class AppLoggerService extends Logger {
  setContext(context: string) {
    super.setContext(context);
  }
  constructor(context: string, isTimestampEnabled: boolean) {
    super(context, isTimestampEnabled);
  }

  warn(message: any, context?: string) {
    // super.log(message, context);
    appLogger.info(message, context, true);
  }
}
