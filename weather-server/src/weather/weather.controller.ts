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
  async locationsInfo(@Query() filterDto: FilterDto){
    return await this.weatherService.locationsInfo(filterDto)
  }

  @Get('location')
  @HttpCode(HttpStatus.OK)
  async locationInfo(@Query() dto: CodeDto){
    return await this.weatherService.locationInfo(dto.code)
  }

  @Get('sido')
  @HttpCode(HttpStatus.OK)
  async sido(@Query() dto: CodeDto){
    return await this.weatherService.getSido(dto.code)
  }

  @Get('gu')
  @HttpCode(HttpStatus.OK)
  async gu(@Query() dto: CodeDto){
    return await this.weatherService.getGu(dto.code)
  }

  @Post('gu')
  @HttpCode(HttpStatus.OK)
  async guhi3(@Query() dto: CodeDto){
    return await this.weatherService.getGu(dto.code)
  }

  // 흠...날씨데이터는 front진행이 되어야 하기쉬울듯

  @Get('test2')
  async dayWeather(){
    const launchOption = this.isDev ? { headless: false, slowMo: 50 } : { headless: 'shell' as const }
    // const testArray = [{"code":"5115061500","name":"강남동","lat":"37.74421","lon":"128.90561"}, {"code":"5115034000","name":"강동면","lat":"37.7254","lon":"128.95651"}]
    const data = await readFile('./region.json', 'utf-8');
    const parseWeather = JSON.parse(data)
    const weatherUrl = "https://www.weather.go.kr/w/weather/forecast/short-term.do"
    const browser = await puppeteer.launch({ headless: 'shell' as const });
    const page = await browser.newPage();

    const weatherObjectArray = [] as any[];

    for (const object of parseWeather) {
      await page.goto(`${weatherUrl}#dong/${object.code}`);
      await page.waitForSelector('.dfs-slider .slide-wrap');
      
      const weather = await page.evaluate(() => {
        const result = [];
        const ulElements = document.querySelector('.dfs-slider .slide-wrap .daily .item-wrap > ul');
      
        const date = ulElements.getAttribute('data-date');
          const time = ulElements.getAttribute('data-time');
          
          const dailyWeather = {
            date,
            time,
            weatherDetails: {}
          };
      
          const listItems = ulElements.querySelectorAll('li');
          listItems.forEach(li => {
            const keyElement = li.querySelector('.hid');
            const valueElement = li.querySelector('span:not(.hid)');
            if (keyElement && valueElement) {
              const key = keyElement.textContent.trim().replace(':', '');
              const value = valueElement.textContent.trim() || '-';
              dailyWeather.weatherDetails[key] = value;
            }
          });
      
          result.push(dailyWeather);
      
        return result;
      });
    
      weatherObjectArray.push({ ...object, weather });
    }

    // some db save code
    // console.log(weatherObjectArray[0].weather[2])

    await this.weatherService.saveWeatherData(weatherObjectArray)

    return weatherObjectArray
  }

  @Get('test-queue')
  async test3(){
    return await this.schService.updateWeatherQueue()
  }

}
