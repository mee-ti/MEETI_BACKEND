import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Calendar } from '../calendar.schema';
import { Model } from 'mongoose';
import { ScheduleDto } from '../dto/schedule.dto';
import { CalendarService } from '../services/calendar.service';

@Controller('schedule')
export class CalendarController {
  constructor(
    @InjectModel(Calendar.name) private readonly calendarModel: Model<Calendar>,
    private readonly calendarService: CalendarService,
  ) { }

  @Post('/set-schedule')
  async setSchedule(@Body() scheduleDto: ScheduleDto) {

    return await this.calendarService.setSchedule(scheduleDto);
  }

  @Get('/get-schedule')
  async getSchedule() {

    return await this.calendarService.getSchedule();
  }
}
