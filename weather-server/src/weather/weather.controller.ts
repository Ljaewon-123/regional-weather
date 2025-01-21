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
import { DateRangeDto, DateRangeDtoWithLocationIds } from './dto/date-range.dto';

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

  @Get('test-weathers')
  async newWeathers(){
    return await this.schService.saveWeather()
  }

  // 그럼 일단 하나의 동(location)에서 온도를 가공 
  @Get()
  async weather(@Query() dateRangeDto: DateRangeDtoWithLocationIds){
    return await this.weatherService.weatherAverage(dateRangeDto)
  }

}


/**
 * 
 * 
시도는 대전만 하니까 일단 뺄까 
구 , 동 별 기간, 각 날씨 데이터의 평균, 중위값 정도면 될려나
서로 다른 구, 시 중 가장 높은 강수량 온도 정도
집계해야 할 데이터
기간별 평균 및 중위값:

평균 온도

평균 체감온도

평균 습도

평균 강수량

평균 강수확률

평균 바람 속도

평균 적설강도

가장 높은 값:

최대 온도

최대 강수량
 */