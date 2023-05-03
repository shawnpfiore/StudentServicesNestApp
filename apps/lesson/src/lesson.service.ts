import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LessonService {
  private readonly logger = new Logger(LessonService.name);
  getHello(): string {
    return 'Hello World!';
  }

  lesson(data: any) {
    this.logger.log('lesson...', data);
  }
}
