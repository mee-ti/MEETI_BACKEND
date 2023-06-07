import { Module } from '@nestjs/common';
import { ReservationController } from './controller/reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './services/reservation.service';
import { Reservation, reservationSchema } from './reservation.schema';
import { ReservationRepository } from './repository/reservation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: reservationSchema },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule { }
