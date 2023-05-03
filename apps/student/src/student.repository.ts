import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { Student } from './schemas/student.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class StudentRepository extends AbstractRepository<Student> {
  protected readonly logger = new Logger(StudentRepository.name);

  constructor(
    @InjectModel(Student.name) studentModel: Model<Student>,
    @InjectConnection() connection: Connection,
  ) {
    super(studentModel, connection);
  }
}
