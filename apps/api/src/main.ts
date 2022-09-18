/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppLoggerService } from './app/app-logger.service';
import * as requestIp from 'request-ip';
import { ErrorFilter } from './app/errors.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console });
  const globalPrefix = 'api';
  app.use(requestIp.mw());
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(AppLoggerService));
  const options = new DocumentBuilder()
    .setTitle('Virtual-11 REST API Documents')
    .addServer('', 'play and win')
    .setDescription('Virtual-11 API reference for developers')
    .setVersion('1.0')
    .setLicense('MIT', 'https://www.wvs.net.in/')
    .setExternalDoc('Terms and conditions', 'https://www.wvs.net.in/')
    .setTermsOfService('Terms')
    .setBasePath('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerUrl: 'http://localhost:3333',
  });
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
