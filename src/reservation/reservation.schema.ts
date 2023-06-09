import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
}

@Schema(options)
export class Reservation extends Document {
  @Prop({
    required: true,
    default: "접수중"
  })
  status: string;

  @Prop({
    // required: true,
  })
  @IsNotEmpty()
  // @IsString()
  telNum: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  pay: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  placeName: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  decrition: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  areaName: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  detailAdress: string;

  @Prop({
    required: true,
  })
  @IsString()
  imgUrl: string;

  @Prop({
    default: ""
  })
  date: string;
}

export const reservationSchema = SchemaFactory.createForClass(Reservation);

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
