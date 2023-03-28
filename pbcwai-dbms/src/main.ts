import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  // Nest Application with Express Platform.
  const app: NestExpressApplication
    = await NestFactory.create<NestExpressApplication>(AppModule);

  // Assign global url path prefix to all endpoints.
  app.setGlobalPrefix('/api');

  // Listen on localhost port 3000.
  await app.listen(3000);
}

bootstrap();
