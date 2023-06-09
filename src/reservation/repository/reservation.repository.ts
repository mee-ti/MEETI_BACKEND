import { ReservationDto } from './../dto/reservation.dto.';
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
    const { telNum, pay, placeName, decrition, areaName, detailAdress } = reservationDto;
    try {
      await this.reservationModel.create({ telNum, pay, placeName, decrition, areaName, detailAdress, imgUrl });

      return { result: true, message: "회의실 등록 성공" };
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }


  async create2(reservationDto: CreateReservationDto) {
    try {
      await this.reservationModel.create(reservationDto);

      return { result: true, message: "회의실 등록 성공" };
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }

  async findAll() {
    try {
      const office = await this.reservationModel.find();
      return { office, message: "회의실 목록 조회 성공" };
    } catch (error) {
      throw new BadRequestException(`Find all office failed : ${error}`);
    }
  }

  async search(search: string) {
    try {
      const regex = (pattern) => new RegExp(`.*${pattern}.*`);
      const nameRegex = regex(search);
      const office = await this.reservationModel.find({ placeName: { $regex: nameRegex } });
      return { result: true, message: '회의실 검색 성공', office };
    } catch (error) {
      throw new BadRequestException(`Office serch failed : ${error}`);
    }
  }

  async classification(area: string) {
    try {
      const office = await this.reservationModel.find({ areaName: area });
      return { result: true, message: '지역 분류 성공', office };
    } catch (error) {
      throw new BadRequestException(`Office classification failed : ${error}`);
    }
  }

  async detail(id: string) {
    try {
      const office = await this.reservationModel.findById(id);
      return { result: true, message: '회의실 상세 조회 성공', office };
    } catch (error) {
      throw new BadRequestException(`Office detail find failed : ${error}`);
    }
  }

  async reservation(reservationDto: ReservationDto) {
    const { id, date } = reservationDto;
    try {
      await this.reservationModel.updateOne({ _id: id }, { $set: { status: "예약 완료" } });
      await this.reservationModel.updateOne({ _id: id }, { $set: { date: date } });
      return { result: true, message: '회의실 예약 성공!' };
    } catch (error) {
      throw new BadRequestException(`Office reservation failed : ${error}`);
    }
  }

  async checkReservation() {
    try {
      const office = await this.reservationModel.find({ status: '예약 완료' });
      return { office, message: "일정 조회 성공" };
    } catch (error) {
      throw new BadRequestException(`Find reservation failed : ${error}`);
    }
  }
}