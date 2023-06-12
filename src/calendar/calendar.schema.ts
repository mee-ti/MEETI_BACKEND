import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
}

@Schema(options)
export class Calendar extends Document {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  color: string;

  @Prop({
    required: true,
  })
  start: string;

  @Prop({
    required: true,
  })
  end: string;
}

export const calendarSchema = SchemaFactory.createForClass(Calendar);

// userSchema.virtual('readOnlyData').get(function (this: User) {
//   return {
//     id: this.id,
//     // email: this.email,
//     // name: this.name,
//   };
// });

// _CatSchema.virtual('comments', {
//   ref: 'comments', //comments 스키마와 연결
//   localField: '_id',
//   foreignField: 'info', //외레필드
// });
// _CatSchema.set('toObject', { virtuals: true }); //populate 옵션을 사용하기 위한 두 가지 옵션
// _CatSchema.set('toJSON', { virtuals: true });
