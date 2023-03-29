import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  // Nest Application with Express Platform.
  const app: NestExpressApplication
    = await NestFactory.create<NestExpressApplication>(AppModule);

  // Assign global url path prefix to all endpoints.
  // So then otherwise-unqalified "products" is under /api/products and so on.
  app.setGlobalPrefix('/api');

  // Generate Swagger docs from the implementing code.
  // This produces multiple endpoints, each with a different format of the docs:
  //    /api/api-docs
  //    /api/api-docs-json
  //    /api/api-docs-yaml
  const config = new DocumentBuilder()
    .setTitle('pbcwai-dbms')
    .setVersion('0.0.1')
    .setDescription('Province of British Columbia - Web Application Inventory - DBMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/api-docs', app, document);

  // Listen on localhost port 3000.
  await app.listen(3000);
}

bootstrap();
