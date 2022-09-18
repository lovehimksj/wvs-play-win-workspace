/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { getLogger } from 'log4js';
const errorLogger = getLogger('app');
@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED) {
      errorLogger.error(error.name, [error.message, error.stack]);
      return response.status(status).send(error.message);
    }
    if (status === HttpStatus.NOT_FOUND) {
      errorLogger.error(error.name, [error.message, error.stack]);
      return response.status(status).send(error);
    }
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'production') {
        errorLogger.error(error.name, [error.message, error.stack]);
        return response.status(status).send(error);
      } else {
        const message = error.stack;
        errorLogger.error(error.name, [error.message, error.stack]);
        return response.status(status).send(message);
      }
    }
  }
}
