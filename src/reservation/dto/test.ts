import { IsString } from 'class-validator';

export class TestDto {
  // @IsString()
  readonly telNum: string;

  @IsString()
  readonly pay: string;

  @IsString()
  readonly placeName: string;

  @IsString()
  readonly decrition: string;

  @IsString()
  readonly areaName: string;

  @IsString()
  readonly detailAdress: string;

  @IsString()
  readonly imgUrl: string;
}