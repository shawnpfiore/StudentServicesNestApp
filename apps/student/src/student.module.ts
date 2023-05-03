import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { StudentRepository } from './student.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { LESSON_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/student/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    RmqModule.register({
      name: LESSON_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
})
export class StudentModule {}
