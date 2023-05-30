import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendar, calendarSchema } from './calendar.schema';
import { CalendarController } from './controller/calendar.controller';
import { CalendarService } from './services/calendar.service';
import { CalendarRepository } from './repository/calendar.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calendar.name, schema: calendarSchema },
    ]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService, CalendarRepository],
})

export class CalendarModule { }
