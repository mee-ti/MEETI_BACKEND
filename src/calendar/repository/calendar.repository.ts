import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleDto } from '../dto/schedule.dto';
import { Calendar } from '../calendar.schema';

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectModel(Calendar.name) private readonly calendarModel: Model<Calendar>,
  ) { }

  async setSchedule(scheduleDto: ScheduleDto) {
    const schedule = await this.calendarModel.create(scheduleDto);

    return schedule;
  }

  async getSchedule() {
    const schedule = await this.calendarModel.find({}, { _id: 0 });

    return schedule;
  }
}