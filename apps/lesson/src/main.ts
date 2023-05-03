import { NestFactory } from '@nestjs/core';
import { LessonModule } from './lesson.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(LessonModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('LESSON'));
  await app.startAllMicroservices();
}
bootstrap();
