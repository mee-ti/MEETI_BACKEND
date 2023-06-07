import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from '../reservation.schema';
import { CreateReservationDto } from '../dto/create-reservation.dto';


@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>,
  ) { }

  async create(imgUrl: string, reservationDto: CreateReservationDto) {
    const { telNum, pay, placeName, decrition, areaName, detailAdress } = reservationDto
    try {
      await this.reservationModel.create({ telNum, pay, placeName, decrition, areaName, detailAdress, imgUrl });

      return { result: true, message: "회의실 등록 성공" };
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }

  async findAll() {
    try {
      const reservation = await this.reservationModel.find();
      return { reservation, message: "회의실 목록 조회 성공" };
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }
}