import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ScheduleWeatherService } from './schedule-weather.service';
import { WeatherService } from './weather.service';

@Processor('schedule-queue')
export class ScheduleConsumer extends WorkerHost {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly scheduleService: ScheduleWeatherService
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(job.data.message)
    switch(job.name){
      case "saveWeather": {
        return this.scheduleService.saveWeather()
      }
      case "locationQueue": {
        return this.scheduleService.locationsCollector()
      }
    }
  }
}