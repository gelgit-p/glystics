require('dotenv').config();

console.log('🔥 MAIN.TS LOADED', process.pid);

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('🚀 BOOTSTRAP', process.pid);

  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const port = Number(process.env.PORT ?? 3000);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  console.log(`🚀 Server ready at: http://localhost:${port}`);
}

bootstrap();