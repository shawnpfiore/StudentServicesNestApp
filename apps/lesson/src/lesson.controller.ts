import { Controller, Get, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { JwtAuthGuard, RmqService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.lessonService.getHello();
  }

  @EventPattern('student_created')
  @UseGuards(JwtAuthGuard)
  async handleStudentCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.lessonService.lesson(data);
    this.rmqService.ack(context);
  }
}
