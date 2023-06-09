import { IsString } from 'class-validator';

export class ReservationDto {
  @IsString()
  readonly id: string;

  readonly date: string;
}