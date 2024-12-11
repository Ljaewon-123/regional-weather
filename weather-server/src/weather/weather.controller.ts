import { Controller, Get } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Controller('weather')
export class WeatherController {
  private isDev = process.env.NODE_ENV == 'dev'

  @Get('test')
  async testWeather(){
    const weatherUrl = "https://www.weather.go.kr/w/weather/forecast/short-term.do"
    const launchOption = this.isDev ? { headless: false, slowMo: 150 } : { headless: 'shell' as const }
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
    // evaluate 브라우저환경에서만 실행 
    // 브라우저 페이지 내부의 JavaScript 컨텍스트에서 실행됨 
    const regionCode = await regionWrap.evaluate(async wrap => {
      const wait = (ms:number) => new Promise((res) => setInterval(res, ms))
      const codeWrapper = []
      let links = wrap.querySelectorAll('a.addr-chk-btn');

      // const a = links[0] as HTMLElement
      // a.click()
      // await wait(1000);
      // let guLinks = wrap.querySelectorAll('a.addr-chk-btn');
      // const b = guLinks[1] as HTMLElement
      // b.click()
      // await wait(1000);
      // const dongLinks = wrap.querySelectorAll('a.addr-chk-btn');
      // for (const dongLink of dongLinks) {
      //   const dongLinkElement = dongLink as HTMLElement;
      //   if (dongLinkElement.getAttribute('data-goto')) continue;
      //   // dongLinkElement.click();
      // }
      // const dongGoto = dongLinks[0] as HTMLElement
      // dongGoto.click()
      // await wait(200);
      // guLinks = wrap.querySelectorAll('a.addr-chk-btn');

      // const c = guLinks[2] as HTMLElement
      // c.click()
      // await wait(1000);
      // const dongLinks2 = wrap.querySelectorAll('a.addr-chk-btn');
      // for (const dongLink of dongLinks) {
      //   const dongLinkElement = dongLink as HTMLElement;
      //   if (dongLinkElement.getAttribute('data-goto')) continue;
      //   // dongLinkElement.click();
      // }
      // const dongGoto2 = dongLinks2[0] as HTMLElement
      // dongGoto2.click()
      // await wait(200);
      // guLinks = wrap.querySelectorAll('a.addr-chk-btn');

      // const guGoto = guLinks[0] as HTMLElement
      // guGoto.click()
      // await wait(200);

      // const d = links[1] as HTMLElement
      // d.click()

      // ******

      const siLoop = async(index: number) => {
        
        const siLink = links[index] as HTMLElement
        siLink.click();
        await wait(1000);
        let guLinks = wrap.querySelectorAll('a.addr-chk-btn');

        const plz = async(index: number) => {
          // for(let idx = 1; idx <= guLinks.length ; idx++){
            const guLinkElement = guLinks[index] as HTMLElement;
            guLinkElement.click();
            await wait(200);
  
            const dongLinks = wrap.querySelectorAll('a.addr-chk-btn');
            for (const dongLink of dongLinks) {
              const dongLinkElement = dongLink as HTMLElement;
              if (dongLinkElement.getAttribute('data-goto')) continue;
              // dongLinkElement.click();
            }
            const dongGoto = dongLinks[0] as HTMLElement
            dongGoto.click()
            await wait(200);
            guLinks = wrap.querySelectorAll('a.addr-chk-btn');
          // }
        }
        // await plz()
        Array.from(guLinks).splice(0, 1)
        guLinks.forEach(async ( _, index) => await plz(index))
        

        const guGoto = guLinks[0] as HTMLElement
        guGoto.click()
        await wait(200);
      }
      
      for (const link of links) {
        // const link = links[0] as HTMLElement
        const siLink = link as HTMLElement
        siLink.click();
        await wait(1000);
        let guLinks = wrap.querySelectorAll('a.addr-chk-btn');

        const plz = async(index: number) => {
          // for(let idx = 1; idx <= guLinks.length ; idx++){
            const guLinkElement = guLinks[index] as HTMLElement;
            guLinkElement.click();
            await wait(200);
  
            const dongLinks = wrap.querySelectorAll('a.addr-chk-btn');
            for (const dongLink of dongLinks) {
              const dongLinkElement = dongLink as HTMLElement;
              if (dongLinkElement.getAttribute('data-goto')) continue;
              // dongLinkElement.click();
            }
            const dongGoto = dongLinks[0] as HTMLElement
            dongGoto.click()
            await wait(200);
            guLinks = wrap.querySelectorAll('a.addr-chk-btn');
          // }
        }
        // await plz()
        Array.from(guLinks).splice(0, 1)
        guLinks.forEach(async ( _, index) => await plz(index))
        
        
        const guGoto = guLinks[0] as HTMLElement
        guGoto.click()
        await wait(200);
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
}
