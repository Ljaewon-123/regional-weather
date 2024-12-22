import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer';
import { Locations } from './entity/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './entity/weather.entity';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private isDev = process.env.NODE_ENV == 'dev'
  constructor(
    @InjectRepository(Locations)
    private locationsRepository: Repository<Locations>,
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ){}

  async locationsInfo(filter?: { [key: string]: any }) {
    if (filter) {
      return await this.locationsRepository.find({ where: filter });
    } 

    return await this.locationsRepository.find();
  }

  async locationInfo(code: string){
    return await this.locationsRepository.findOne({ 
      where: {
        code
      } 
    })
  }

  async saveWeatherData(weatherData: any[]) {
    const weatherToSave = [];
  
    for (const data of weatherData) {
      const location = await this.locationsRepository.findOne({
        where: { code: data.code },
      });
      
      // 앞선날짜가 초기화 되면 쓸모없어질 거라고 생각해서? 처음꺼 하나만 가져오기로함함
      const weatherOne = data.weather[0]

      if (location) {
        const weather = this.weatherRepository.create({
          location,
          date: weatherOne.date,
          time: weatherOne.time,
          weatherCondition: weatherOne.weatherDetails.날씨,
          perceivedTemperature: weatherOne.weatherDetails.체감온도 || null,
          precipitation: weatherOne.weatherDetails.강수량 || null,
          precipitationProbability: weatherOne.weatherDetails.강수확률,
          wind: weatherOne.weatherDetails.바람,
          humidity: weatherOne.weatherDetails.습도,
          coldWaveEffect: weatherOne.weatherDetails.한파영향 || null,
          snowfallIntensity: weatherOne.weatherDetails.적설강도 || null,
        });
  
        weatherToSave.push(weather);  // 데이터를 배열에 모은다
      } else {
        console.error(`Location not found for code: ${data.code}`);
      }
    }
  
    if (weatherToSave.length > 0) {
      await this.weatherRepository.save(weatherToSave);  // 한 번에 저장
    }
  }





  @Cron(CronExpression.EVERY_10_MINUTES, {
    timeZone: "Asia/Seoul"
  })
  async weatherCollector() {
    // puppeteer dev option??? 
    // {
    //   headless: false,
    //   slowMo: 250, // slow down by 250ms
    // }
    console.log(this.isDev)
    // const launchOption = this.isDev ? { headless: false, slowMo: 200 } : { headless: 'shell' as const }
    // const browser = await puppeteer.launch(launchOption);
    // const page = await browser.newPage();

    // // Navigate the page to a URL
    // await page.goto('https://developer.chrome.com/');

    // // Set screen size
    // await page.setViewport({width: 1080, height: 1024});

    // // Type into search box
    // await page.type('.devsite-search-field', 'automate beyond recorder');

    // // Wait and click on first result
    // const searchResultSelector = '.devsite-result-item-link';
    // await page.waitForSelector(searchResultSelector);
    // await page.click(searchResultSelector);

    // // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    //   'text/Customize and automate',
    // );
    // const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // // Print the full title
    // console.log('The title of this blog post is "%s".', fullTitle);

    // await browser.close();
  }
}
