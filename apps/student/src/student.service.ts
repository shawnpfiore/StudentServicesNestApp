import { Inject, Injectable } from '@nestjs/common';
import { CreateStudentRequest } from './dto/create-student.request';
import { StudentRepository } from './student.repository';
import { LESSON_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    @Inject(LESSON_SERVICE) private lessonClient: ClientProxy,
  ) {}

  async createStudent(request: CreateStudentRequest, authentication: string) {
    const session = await this.studentRepository.startTransaction();
    try {
      const student = await this.studentRepository.create(request, { session });
      await lastValueFrom(
        this.lessonClient.emit('student_created', {
          request,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();
      return student;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getStudent() {
    return this.studentRepository.find({});
  }
}
