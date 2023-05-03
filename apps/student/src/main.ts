import { NestFactory } from '@nestjs/core';
import { StudentModule } from './student.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(StudentModule);
  app.useGlobalPipes(new ValidationPipe());
  const configureService = app.get(ConfigService);
  await app.listen(configureService.get('PORT'));
}
bootstrap();
