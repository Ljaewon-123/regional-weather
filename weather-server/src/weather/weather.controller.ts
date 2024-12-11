import { Controller, Get } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Controller('weather')
export class WeatherController {
  private isDev = process.env.NODE_ENV == 'dev'

  @Get('test')
  async testWeather(){
    const weatherUrl = "https://www.weather.go.kr/w/weather/forecast/short-term.do"
    const launchOption = this.isDev ? { headless: false, slowMo: 50 } : { headless: 'shell' as const }
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

      const links = wrap.querySelectorAll('a.addr-chk-btn[data-level="1"');
      console.log(links.length)

      for(let i = 0 ; i < links.length ; i++){
        const link = links[i] as HTMLElement
        console.log(link.innerText)
        link.click()
        await wait(2000)
      }

      return codeWrapper
      // return Array.from(links).map(link => ({
      //   code: link.getAttribute('data-code'),
      //   name: link.getAttribute('data-name'),
      //   lat: link.getAttribute('data-lat'),
      //   lon: link.getAttribute('data-lon')
      // }));
    }) 
    console.log(regionCode, 'code')

    await browser.close();
  }

  @Get('test2')
  async testWeather2(){
    
    // const regionCode = await regionWrap.evaluate(async wrap => {
    //   const wait = (ms:number) => new Promise((res) => setInterval(res, ms))
    //   const clickAndWait = async (element: HTMLElement, ms = 1000) => {
    //     if (element) {
    //       element.click();
    //       await wait(ms);
    //     }
    //   };
    //   const codeWrapper = []

    //   let links = wrap.querySelectorAll('a.addr-chk-btn');

    //   const siLoop = async(index: number) => {
        
    //     const siLink = links[index] as HTMLElement
    //     await clickAndWait(siLink);

    //     let guLinks = wrap.querySelectorAll('a.addr-chk-btn');

    //     const plz = async(index: number) => {
    //       const guLinkElement = guLinks[index] as HTMLElement;
    //       await clickAndWait(guLinkElement, 500);

    //       const dongLinks = wrap.querySelectorAll('a.addr-chk-btn');
    //       for (const dongLink of dongLinks) {
    //         const dongLinkElement = dongLink as HTMLElement;
    //         if (dongLinkElement.getAttribute('data-goto')) continue;
    //         console.log(dongLinkElement.innerText)
            
    //         const codes = {
    //           code: dongLinkElement.getAttribute('data-code'),
    //           name: dongLinkElement.getAttribute('data-name'),
    //           lat: dongLinkElement.getAttribute('data-lat'),
    //           lon: dongLinkElement.getAttribute('data-lon')
    //         }

    //         codeWrapper.push(codes)
    //       }
    //       const dongGoto = dongLinks[0] as HTMLElement
    //       await clickAndWait(dongGoto, 500);
    //       guLinks = wrap.querySelectorAll('a.addr-chk-btn');
    //     }

    //     const guList = Array.from(guLinks)
    //     guList.splice(0, 1)
        
    //     // guLinks.forEach(async ( _, index) => await plz(index))
    //     for(let i = 0; i < guList.length ; i++){
    //       await plz(index)
    //     }

    //     const guGoto = guLinks[0] as HTMLElement
    //     await clickAndWait(guGoto, 500);
    //   }

    //   // links.forEach(async ( _, index) => await siLoop(index))
    //   for (let index = 0; index < links.length; index++) {
    //     await siLoop(index);
    //     links = wrap.querySelectorAll('a.addr-chk-btn');
    //   }

    //   return codeWrapper
    //   // return Array.from(links).map(link => ({
    //   //   code: link.getAttribute('data-code'),
    //   //   name: link.getAttribute('data-name'),
    //   //   lat: link.getAttribute('data-lat'),
    //   //   lon: link.getAttribute('data-lon')
    //   // }));
    // }) 
    // console.log(regionCode, 'code')


  }
}
