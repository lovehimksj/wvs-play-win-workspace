import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterModule } from './master/master.module';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppImplService } from './app-impl.service';
import { SpecialityCodeMaster } from '@wvs-play-win-workspace/api-interfaces';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'play_cricket_win',
    autoLoadEntities: true,
    entities: [],
    synchronize: true
  }), MasterModule, CacheModule.register ({ ttl: 100000 }), TypeOrmModule.forFeature ([SpecialityCodeMaster]), UserModule],
  controllers: [AppController],
  providers: [{ provide: AppService, useClass: AppImplService }, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  }]
})
export class AppModule {
}

