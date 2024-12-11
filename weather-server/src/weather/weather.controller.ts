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
      const links = wrap.querySelectorAll('a.addr-chk-btn');

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
      
      for (const link of links) {
        const siLink = link as HTMLElement
        siLink.click();
        await wait(1000);
        let guLinks = wrap.querySelectorAll('a.addr-chk-btn');
        for(let idx = 1; idx <= guLinks.length ; idx++){
          const guLinkElement = guLinks[idx] as HTMLElement;
          guLinkElement.click();
          await wait(1000);

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
        }
        const guGoto = guLinks[0] as HTMLElement
        guGoto.click()
      }


      // links.forEach( async(link: HTMLElement) => {
      //   link.click()
      //   await wait(2000)
      //   const guLinks = wrap.querySelectorAll('a.addr-chk-btn');
      //   for( const guLink of guLinks){
      //     const link = guLink as HTMLElement
      //     if(link.getAttribute('data-goto')) continue
      //     link.click()
      //     // const dongLinks = wrap.querySelectorAll('a.addr-chk-btn');
      //     // const codes = Array.from(dongLinks).map( link => ({
      //     //   code: link.getAttribute('data-code'),
      //     //   name: link.getAttribute('data-name'),
      //     //   lat: link.getAttribute('data-lat'),
      //     //   lon: link.getAttribute('data-lon')
      //     // }))
      //     // codeWrapper.push(codes)
      //   }
      // })
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
