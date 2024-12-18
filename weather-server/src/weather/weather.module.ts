import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './entity/location.entity';
import { Weather } from './entity/weather.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Locations, Weather]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
