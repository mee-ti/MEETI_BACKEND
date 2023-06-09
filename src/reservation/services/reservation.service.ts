import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';

// import { FindReservationDto } from '../dto/find-reservation.dto';
import { ReservationRepository } from '../repository/reservation.repository';
import { CreateReservationDto } from './../dto/create-reservation.dto';
import { ReservationDto } from '../dto/reservation.dto.';


@Injectable()
export class ReservationService {
  private readonly awsS3: AWS.S3;
  public readonly S3_BUCKET_NAME: string

  constructor(
    private readonly reservationRepository: ReservationRepository
  ) {
    this.awsS3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      region: process.env.AWS_S3_REGION,
    });
    this.S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
  }

  async create(folder: string, file: Express.Multer.File, reservationDto: CreateReservationDto) {
    try {
      const key = `${folder}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, '');

      await this.awsS3
        .putObject({
          Bucket: this.S3_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: file.mimetype,
        })
        .promise();

      const imgUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;

      const result = await this.reservationRepository.create(imgUrl, reservationDto);

      return result;
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }

  async create2(reservationDto: CreateReservationDto) {
    const result = await this.reservationRepository.create2(reservationDto);

    return result;
  }

  async findAll() {
    const result = await this.reservationRepository.findAll();

    return result;
  }

  async search(search: string) {
    return await this.reservationRepository.search(search);;
  }

  async classification(area: string) {
    return await this.reservationRepository.classification(area);;
  }

  async detail(id: string) {
    return await this.reservationRepository.detail(id);
  }

  async reservation(reservationDto: ReservationDto) {
    const { id, date } = reservationDto;
    return await this.reservationRepository.reservation({
      id,
      date: date.substring(0, 4) + '년 ' + date.substring(5, 7) + '월 ' + date.substring(8, 10) + '일'
    });
  }

  async checkReservation() {
    return await this.reservationRepository.checkReservation();
  }
}