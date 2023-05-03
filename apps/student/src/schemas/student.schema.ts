import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Student extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
