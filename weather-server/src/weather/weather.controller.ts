import { Controller, Get } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';
import * as fs from 'fs';
import { readFile } from 'fs/promises';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locations } from './entity/location.entity';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  private isDev = process.env.NODE_ENV == 'dev'
  constructor(
    private readonly weatherService: WeatherService,
    @InjectRepository(Locations)
    private readonly locationRepo: Repository<Locations>
  ){}

  @Get('test2')
  async dayWeather(){
    const launchOption = this.isDev ? { headless: false, slowMo: 50 } : { headless: 'shell' as const }
    const testArray = [{"code":"5115061500","name":"강남동","lat":"37.74421","lon":"128.90561"}, {"code":"5115034000","name":"강동면","lat":"37.7254","lon":"128.95651"}]
    const data = await readFile('./weather.json', 'utf-8');
    const parseWeather = JSON.parse(data)
    const weatherUrl = "https://www.weather.go.kr/w/weather/forecast/short-term.do"
    const browser = await puppeteer.launch({ headless: 'shell' as const });
    const page = await browser.newPage();

    const weatherObjectArray = [] as any[];

    for (const object of testArray) {
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
    console.log(weatherObjectArray[0].weather[2])

    await this.weatherService.saveWeatherData(weatherObjectArray)

    return weatherObjectArray
  }

  @Get('test')
  async testWeather(){
    const weatherUrl = "https://www.weather.go.kr/w/weather/forecast/short-term.do"
    const launchOption = this.isDev ? { headless: false, slowMo: 50 } : { headless: 'shell' as const }
    const browser = await puppeteer.launch({ headless: 'shell' as const, protocolTimeout: 210000 });
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

      let sidoLinks = wrap.querySelectorAll('a.addr-chk-btn[data-level="1"]');
      console.log(sidoLinks.length)
      const lenSido = sidoLinks.length

      for(let i = 0 ; i < lenSido ; i++){
        const link = sidoLinks[i] as HTMLElement
        console.log(link.innerText, 'it is si * do!!!!')
        link.click()
        await wait(500)

        // Level 2 작업
        let guElements = wrap.querySelectorAll('a.addr-chk-btn[data-level="2"]');
        for (let guidx = 0; guidx < guElements.length; guidx++) {
          const guHtmlElement = guElements[guidx] as HTMLElement;
          console.log(guHtmlElement.innerText, 'level is 2!!!')
          // if (guHtmlElement.getAttribute('data-goto')) continue;
          guHtmlElement.click(); 
          await wait(500);

          // Level 3 작업
          const dongElements = wrap.querySelectorAll('a.addr-chk-btn[data-level="3"]');
          for(const doneElement of dongElements){
            const dongHtmlElement = doneElement as HTMLElement
            console.log(dongHtmlElement.getAttribute('data-name'))
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

      return codeWrapper
    }) 
    console.log('code')

    // fs.writeFileSync('weather.json', JSON.stringify(regionCode), 'utf8');
    if (regionCode && regionCode.length > 0) {
      fs.writeFileSync('weather.json', JSON.stringify(regionCode), 'utf8');
      console.log('File written successfully!');
    }
    else{
      console.error('JSON load error?')
    }

    await browser.close();

    return regionCode
  }

  @Get('local')
  async updateJsonLocalData(){
    try{
      const locationsFromJson = fs.readFileSync('weather.json', 'utf-8');
      console.log(typeof locationsFromJson)
      const locations = JSON.parse(locationsFromJson) as Locations[]

      await this.locationRepo.upsert(locations, { conflictPaths: ['code'] });

      console.log('Locations synced successfully.');
    }
    catch (error) {
      console.error('Error syncing locations:', error);
      throw Error(error);
    }
  }

}
