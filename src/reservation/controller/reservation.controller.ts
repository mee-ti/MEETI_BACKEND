import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationService } from '../services/reservation.service';
import { FindReservationDto } from '../dto/find-reservation.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
  ) { }

  @Post('set-office')
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() reservationDto: CreateReservationDto) {
    return await this.reservationService.create('reservation', file, reservationDto);
  }

  @Get('get-office')
  async findAll() {
    return await this.reservationService.findAll();
  }
}
