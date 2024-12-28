import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ScheduleWeatherService } from './schedule-weather.service';
import { forwardRef, Inject } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Processor('schedule-queue')
export class ScheduleConsumer extends WorkerHost {
  constructor(
    private readonly weatherService: WeatherService
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(job.name, job.data, await this.weatherService.locationsInfo())
    return await this.weatherService.locationsInfo()
    // await new Promise(res => setTimeout(res, 10000))
    // console.log('end')
  }
}