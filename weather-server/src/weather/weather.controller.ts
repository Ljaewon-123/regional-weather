import { Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';
import * as fs from 'fs';
import { readFile } from 'fs/promises';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locations } from './entity/location.entity';
import { WeatherService } from './weather.service';
import { GuData } from './entity/gu-data.entity';
import { Sido } from './entity/sido.entity';
import { CodeDto } from './dto/code.dto';
import { FilterDto } from './dto/filter.dto';
import { ScheduleWeatherService } from './schedule-weather.service';
import { LimitDto } from './dto/limit.dto';
import { Weather } from './entity/weather.entity';

@Controller('weather')
export class WeatherController {
  private isDev = process.env.NODE_ENV == 'dev'
  constructor(
    private readonly schService: ScheduleWeatherService,
    private readonly weatherService: WeatherService,
    @InjectRepository(Locations)
    private readonly locationRepo: Repository<Locations>,
    @InjectRepository(GuData)
    private readonly gudataRepo: Repository<GuData>,
    @InjectRepository(Sido)
    private readonly sidoRepo: Repository<Sido>
  ){}

  @Get('locations')
  @HttpCode(HttpStatus.OK)
  async locationsInfo(@Query() filterDto: FilterDto): Promise<Locations[]>{
    return await this.weatherService.locationsInfo(filterDto)
  }

  @Get('location')
  @HttpCode(HttpStatus.OK)
  async locationInfo(@Query() dto: CodeDto): Promise<Locations>{
    return await this.weatherService.locationInfo(dto.code)
  }

  @Get('sido')
  @HttpCode(HttpStatus.OK)
  async sido(@Query() dto: CodeDto): Promise<Sido>{
    return await this.weatherService.getSido(dto.code)
  }

  @Get('gu')
  @HttpCode(HttpStatus.OK)
  async gu(@Query() dto: CodeDto): Promise<GuData> {
    return await this.weatherService.getGu(dto.code)
  }

  @Get('gus')
  @HttpCode(HttpStatus.OK)
  async gus(@Query() dto: CodeDto): Promise<GuData[]>{
    return await this.weatherService.getGus(dto.code)
  }

  // 흠...날씨데이터는 front진행이 되어야 하기쉬울듯
  @Get('test-queue')
  async test3(){
    return await this.schService.updateWeatherQueue()
  }

  @Get('all-weather')
  async allWeather(@Query() limitDto: LimitDto): Promise<Weather[]> {
    return await this.weatherService.allWeahter(limitDto.limit)
  }


}
