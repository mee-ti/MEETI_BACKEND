import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ReservationService } from '../services/reservation.service';
import { FindReservationDto } from '../dto/find-reservation.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TestDto } from '../dto/test';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
  ) { }

  @Post('/set-office')
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() reservationDto: CreateReservationDto) {
    return await this.reservationService.create('reservation', file, reservationDto);
  }

  @Post('/set')
  async create2(@Body() reservationDto: TestDto) {
    return await this.reservationService.create2(reservationDto);
  }

  @Get('/get-office')
  async findAll() {
    return await this.reservationService.findAll();
  }

  @Get('/:search')
  async search(@Param('search') search: string) {
    return await this.reservationService.search(search);
  }

  @Get('/classification/:area')
  async classification(@Param('area') area: string) {
    return await this.reservationService.classification(area);
  }
}
