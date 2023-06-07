import { IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
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
}