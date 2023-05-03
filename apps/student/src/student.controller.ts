import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentRequest } from './dto/create-student.request';
import { JwtAuthGuard } from '@app/common';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createStudent(@Body() request: CreateStudentRequest, @Req() req: any) {
    return this.studentService.createStudent(
      request,
      req.cookies?.Authentication,
    );
  }

  @Get()
  async getStudent() {
    return this.studentService.getStudent();
  }

  getHello() {
    return undefined;
  }
}
