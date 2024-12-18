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

  async saveWeatherData(weatherData: any[]) {
    const weatherToSave = [];
  
    for (const data of weatherData) {
      const location = await this.locationsRepository.findOne({
        where: { code: data.code },
      });
  
      if (location) {
        const weather = this.weatherRepository.create({
          location,
          time: data.weather.시각,
          weatherCondition: data.weather.날씨,
          perceivedTemperature: data.weather.체감온도 || null,
          precipitation: data.weather.강수량 || null,
          precipitationProbability: data.weather.강수확률,
          wind: data.weather.바람,
          humidity: data.weather.습도,
          coldWaveEffect: data.weather.한파영향 || null,
          snowfallIntensity: data.weather.적설강도 || null,
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
