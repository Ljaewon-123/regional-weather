import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './entity/location.entity';
import { Weather } from './entity/weather.entity';
import { GuData } from './entity/gu-data.entity';
import { Sido } from './entity/sido.entity';
import { ScheduleWeatherService } from './schedule-weather.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports:[
    TypeOrmModule.forFeature([Locations, Weather, GuData, Sido]),
    BullModule.registerQueue({
      name: 'schedule-queue',
    }),
  ],
  controllers: [WeatherController],
  providers: [WeatherService, ScheduleWeatherService]
})
export class WeatherModule {}
