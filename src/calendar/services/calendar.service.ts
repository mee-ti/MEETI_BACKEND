import { Injectable } from '@nestjs/common';
import { ScheduleDto } from '../dto/schedule.dto';
import { CalendarRepository } from '../repository/calendar.repository';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarRepository: CalendarRepository
  ) { }

  async setSchedule(scheduleDto: ScheduleDto) {
    const { title, color, start, end } = scheduleDto;

    await this.calendarRepository.setSchedule({
      title,
      color,
      start: start.substring(0, 10),
      end: end.substring(0, 10),
    });

    return { result: true, message: "일정 등록 성공" };
  }

  async getSchedule() {
    const result = await this.calendarRepository.getSchedule();

    return { schedule: result };
  }
}
