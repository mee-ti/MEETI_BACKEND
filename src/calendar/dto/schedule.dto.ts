import { IsString } from 'class-validator';

export class ScheduleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly start: string;

  @IsString()
  readonly end: string;
}