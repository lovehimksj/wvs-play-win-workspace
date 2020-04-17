import {
  CACHE_MANAGER,
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags ('App Master')
@Controller ('app')
export class AppController implements OnModuleInit {
  counter;

  constructor (@Inject (CACHE_MANAGER) private cacheManager, private appService: AppService) {
  }

  async onModuleInit (): Promise<void> {
    await this.fetch ();
  }

  @Get ()
  @UseInterceptors (CacheInterceptor)
  fetch () {
    this.counter = this.appService.getSpecialityMaster();
    this.cacheManager.set('master', this.counter, {ttl:200000});
    return this.counter;
  }

// Call this endpoint to reset the cache for the route '/'
  @Get ('reset')
  resetCache (key: string) {
    const routeToClear = '/';
    this.cacheManager.del (routeToClear).then (() => console.log ('clear done'));
  }
}
