import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleDto } from '../dto/schedule.dto';
import { CalendarService } from '../services/calendar.service';

@Controller('schedule')
export class CalendarController {
  constructor(
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
