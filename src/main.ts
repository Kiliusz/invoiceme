import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/loggerMiddleware';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json());
  app.use(logger);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  await app
    .listen(process.env.PORT || 3088)
    .then(() => console.log('Listening on port ' + process.env.PORT));
}
bootstrap();
