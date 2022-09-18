/*
 * @Author Himanshu Maheshwari
 * @email animatorhimanshu.ksj@gmail.com
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { configure, getLogger } from 'log4js';
const logger = getLogger('app');
logger.level = 'all';
configure({
  appenders: { app: { type: 'file', filename: 'app.log' } },
  categories: { default: { appenders: ['app'], level: 'all' } },
});
@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
  use(req: Request, response: Response, next: Function) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    logger.debug(
      'Api Request - ',
      [
        'Origin : ' + req.hostname,
        'Remote IP : ' + req.connection.remoteAddress,
        'Base URL : ' + req.baseUrl,
        'Method : ' + req.method,
        'url : ' + req.url,
        'Body : ' + JSON.stringify(req.body),
      ].toString()
    );
    // console.log(res.json())
    // console.log(res);
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      logger.log(
        'Api Response - ',
        ['status : ' + response.statusCode, 'Response : ' + response].toString()
      );

      logger.log(
        'Api Response - ',
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
    });
    next();
  }
}
