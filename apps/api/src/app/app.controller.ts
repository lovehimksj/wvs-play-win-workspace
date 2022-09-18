import {
  Body,
  CACHE_MANAGER,
  CacheInterceptor,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  OnModuleInit,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Response } from 'express';
import { SuccessResponseModel } from '@wvs-play-win-workspace/api-interfaces';
import { getLogger } from 'log4js';

@ApiTags('App Master')
@Controller('app')
export class AppController implements OnModuleInit {
  counter;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager,
    private appService: AppService
  ) {}

  async onModuleInit(): Promise<void> {
    await this.fetch();
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  fetch() {
    // this.counter = this.appService.getSpecialityMaster();
    Logger.log(this.counter, null, true);
    this.cacheManager.set('master', this.counter, { ttl: 200000 });
    return this.counter;
  }

  // Call this endpoint to reset the cache for the route '/'
  @Get('reset')
  resetCache(key: string) {
    const routeToClear = '/';
    this.cacheManager.del(routeToClear).then(() => console.log('clear done'));
  }

  @ApiResponse({
    description: 'The record has been successfully created.',
    type: SuccessResponseModel,
    status: HttpStatus.OK,
  })
  @Post('log')
  async logClientError(
    @Body() req: { name: any; stack: any; message: any },
    @Res() res: Response
  ): Promise<any> {
    const appLogger = getLogger('app');
    appLogger.error('Client Error', JSON.stringify(req).toString());
    res.status(200).send({});
  }
}
