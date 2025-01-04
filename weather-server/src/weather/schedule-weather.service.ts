import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import { readFile } from 'fs/promises';
import { Locations } from './entity/location.entity';
import { GuData } from './entity/gu-data.entity';
import { Sido } from './entity/sido.entity';
import { WeatherService } from './weather.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ScheduleWeatherService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ScheduleWeatherService.name);
  private isDev = process.env.NODE_ENV == 'dev'
  private rootPath = __dirname +'/../../'
  constructor(
    private weatherService: WeatherService,
    @InjectQueue('schedule-queue') private scheduleQueue: Queue
  ){}

  async onApplicationBootstrap() {
    // this.logger.log(process.env.INSTANCE_ID)
    // console.log(ScheduleWeatherService.name + " started");
    // 하나의 프로세스만 실행 
    if (this.isDev) {
      await this.updateJsonLocalData();
    } 
    else if (process.env.INSTANCE_ID == '0') {
      await this.updateJsonLocalData();
    }
  }

  // CronExpression.EVERY_10_MINUTES
  // if (await this.redisClient.get('stop')) {     // 간단한 redlock 구현
  //   await this.useCheckQueue.pause(); // consumer 처리 정지
  // } else {
  //   await this.useCheckQueue.resume(); // consumer 처리 다시 시작
  // }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async clusterTest(){
  //   this.logger.log(process.env.INSTANCE_ID)
  //   await this.scheduleQueue.add('cluster', {
  //     message: 'cluster-tester'
  //   },
  //   { 
  //     removeOnComplete: true, // 완료시 삭제 
  //     jobId: 'testid' ,
  //     attempts: 3,
  //     backoff: {
  //       type: 'exponential',
  //       delay: 1000,
  //     },
  //     removeOnFail: true 
  //   }
  //   );
  // }

  @Cron(CronExpression.EVERY_10_MINUTES, {
    timeZone: "Asia/Seoul"
  })
  async test1(){
    const job = await this.scheduleQueue.add('saveWeather', {
      message: 'weather'
    },
    { 
      removeOnComplete: true, // 완료시 삭제 
      jobId: 'update' ,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnFail: true // 모든 backoff시도후에 제거 
    }
    );
    return job
  }

  @Cron(CronExpression.EVERY_3_HOURS, {
    timeZone: "Asia/Seoul"
  })
  async updateWeatherQueue(){
    const job = await this.scheduleQueue.add('saveWeather', {
      message: 'weather'
    },
    { 
      removeOnComplete: true, // 완료시 삭제 
      jobId: 'update' ,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnFail: true // 모든 backoff시도후에 제거 
    }
    );
    return job
  }

  @Cron("0 0 0 1 1 *", {
    timeZone: "Asia/Seoul"
  })
  async locationQueue(){
    const job = await this.scheduleQueue.add('locationQueue', {
      message: 'location collector'
    },
    { 
      removeOnComplete: true, // 완료시 삭제 
      jobId: 'location' ,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnFail: true // 모든 backoff시도후에 제거 
    }
    );
    return job
  }

  // @Cron(CronExpression.EVERY_3_HOURS, {
  //   timeZone: "Asia/Seoul"
  // })
  async saveWeather(){
    
    const launchOption = this.isDev ? 
    { headless: false, slowMo: 50 } : 
    { 
      headless: 'shell' as const,
      executablePath: '/usr/bin/google-chrome'
    }
    // const testArray = [{"code":"5115061500","name":"강남동","lat":"37.74421","lon":"128.90561"}, {"code":"5115034000","name":"강동면","lat":"37.7254","lon":"128.95651"}]
    const data = await readFile(this.rootPath + 'region.json', 'utf-8');
    const parseWeather = JSON.parse(data)
    const weatherUrl = "https://www.weather.go.kr/w/weather/forecast/short-term.do"
    const browser = await puppeteer.launch(launchOption);
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
    console.log("save?")

    await this.weatherService.saveWeatherData(weatherObjectArray)

    return weatherObjectArray
  }

  // @Cron("0 0 0 1 1 *", {
  //   timeZone: "Asia/Seoul"
  // })
  async locationsCollector() {
    const weatherUrl = "https://www.weather.go.kr/w/weather/forecast/short-term.do"
    const launchOption = this.isDev ? 
    { headless: false, slowMo: 50 } : 
    { 
      headless: 'shell' as const,
      protocolTimeout: 210000,
      executablePath: '/usr/bin/google-chrome'
    }
    const browser = await puppeteer.launch(launchOption);
    const page = await browser.newPage();

    await page.goto(weatherUrl);

    await page.setViewport({width: 1080, height: 1024});

    const searchResultSelector = '.sym-btn.sch-b';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    const region = '//*[@id="pop-local-search"]/div[1]/a[2]'
    await page.waitForSelector(`::-p-xpath(${region})`);
    await page.click("#pop-local-search .sym-btn.txt-only.pop-open");

    const regionWrap = await page.waitForSelector('.addr-wrap');

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // evaluate 브라우저환경에서만 실행 
    // 브라우저 페이지 내부의 JavaScript 컨텍스트에서 실행됨 
    const regionCode = await regionWrap.evaluate(async wrap => {
      const wait = (ms:number) => new Promise((res) => setTimeout(res, ms))
      const codeWrapper = []
      const sidoWrapper = []
      const guWrapper = []

      let sidoLinks = wrap.querySelectorAll('a.addr-chk-btn[data-level="1"]');
      const lenSido = sidoLinks.length

      for(let i = 0 ; i < lenSido ; i++){
        const link = sidoLinks[i] as HTMLElement
        // console.log(link.innerText, 'it is si * do!!!!')
        // console.log(link.getAttribute('data-name'), link.getAttribute('data-code'))
        const attributes = {
          code: link.getAttribute('data-code'),
          name: link.getAttribute('data-name'),
        };
        sidoWrapper.push(attributes)
        link.click()
        await wait(500)

        // Level 2 작업
        let guElements = wrap.querySelectorAll('a.addr-chk-btn[data-level="2"]');
        for (let guidx = 0; guidx < guElements.length; guidx++) {
          const guHtmlElement = guElements[guidx] as HTMLElement;
          // console.log(guHtmlElement.innerText, 'level is 2!!!')
          const attributes = {
            code: guHtmlElement.getAttribute('data-code'),
            name: guHtmlElement.getAttribute('data-name'),
          };
          guWrapper.push(attributes)
          guHtmlElement.click(); 
          await wait(500);

          // Level 3 작업
          const dongElements = wrap.querySelectorAll('a.addr-chk-btn[data-level="3"]');
          for(const doneElement of dongElements){
            const dongHtmlElement = doneElement as HTMLElement
            // console.log(dongHtmlElement.getAttribute('data-name'))
            const attributes = {
              code: dongHtmlElement.getAttribute('data-code'),
              name: dongHtmlElement.getAttribute('data-name'),
              lat: dongHtmlElement.getAttribute('data-lat'),
              lon: dongHtmlElement.getAttribute('data-lon')
            };

            codeWrapper.push(attributes)
          }
          const gotoCity = wrap.querySelector('a.addr-chk-btn[data-goto="CITY"]') as HTMLElement
          gotoCity.click()

          await wait(200)
          guElements = wrap.querySelectorAll('a.addr-chk-btn[data-level="2"]');
        }
        const gotoWide = wrap.querySelector('a.addr-chk-btn[data-goto="WIDE"]') as HTMLElement
        gotoWide.click()
        await wait(200)
        sidoLinks = wrap.querySelectorAll('a.addr-chk-btn[data-level="1"]');
        
      }

      console.log('Loop END it is over!!!! ')
      console.log('inner codes', codeWrapper)
      // 확실히 별개로 작업함 
      // links.forEach( async (link:HTMLElement) => {
      //   console.log(link.innerText)
      //   await wait(2000)
      // })

      return { codeWrapper, sidoWrapper, guWrapper }
    }) 

    // fs.writeFileSync('weather.json', JSON.stringify(regionCode), 'utf8');
    if (regionCode) {
      fs.writeFileSync('region.json', JSON.stringify(regionCode.codeWrapper), 'utf8');
      fs.writeFileSync('sido.json', JSON.stringify(regionCode.sidoWrapper), 'utf8');
      fs.writeFileSync('guData.json', JSON.stringify(regionCode.guWrapper), 'utf8');
      console.log('File written successfully!');
    }
    else{
      console.error('JSON load error?')
      throw Error('Json write error')
    }

    await browser.close();

    await this.updateJsonLocalData()
    // return regionCode
  }

  async updateJsonLocalData(){
    try{
      const locationsFromJson = fs.readFileSync('region.json', 'utf-8');
      const guFromJson = fs.readFileSync('guData.json', 'utf-8');
      const sidoFromJson = fs.readFileSync('sido.json', 'utf-8');
      // console.log(typeof locationsFromJson) // string
      const locations = JSON.parse(locationsFromJson) as Locations[]
      const locationsGu = JSON.parse(guFromJson) as GuData[]
      const locationsSido = JSON.parse(sidoFromJson) as Sido[]

      // await this.sidoRepo.upsert(locationsSido, { conflictPaths: ['code'] });
      // await this.gudataRepo.upsert(locationsGu, { conflictPaths: ['code'] });
      // await this.locationRepo.upsert(locations, { conflictPaths: ['code'] });

      // 1. Sido 업데이트
      const savedSidos = await this.weatherService.upsertSidos(locationsSido);

      // 2. GuData 업데이트
      const savedGuData = await this.weatherService.upsertGuData(locationsGu, savedSidos);

      // 3. Locations 업데이트
      await this.weatherService.upsertLocations(locations, savedGuData);


      console.log('Locations synced successfully.');
    }
    catch (error) {
      console.error('Error update json:', error);
      throw Error(error);
    }
  }
}
