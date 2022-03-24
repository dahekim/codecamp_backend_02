// 여기어때 크롤링 위법 사례 : https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/

import puppeteer from "puppeteer"

async function startCrawling(){
    // 퍼펫티어로 크로미움 실행 
    const browser = await puppeteer.launch( {headless: false} )                     // 이 브라우저를 부를 때마다 기다려야 합니다 그걸 browser에 담아두겠습니다
    const page = await browser.newPage()                                            // 브라우저 새 페이지 여는 것도 기다려야 하고 그걸 page에다가 담을게요
    await page.setViewport( {width: 1280,  height: 720} )                           // 창 크기도 정해줄게 이것도 기다려야돼
    await page.goto("https://www.goodchoice.kr/product/search/2/2018")              // 페이지에서 () 안으로 이동할거야 너도 기다려
    
    // 접속 하고 텀 주기... 너무 많이 접속하면 서버에 안좋으니깐
    await page.waitForTimeout(1000)

    // 크로울링 
    // page에서 ("~") 셀렉터로 이동해서 요소의 textContent를 가져와서 검증하고 stage / location / price 에 넣기... 그리고 이것도 기다려 
    const stage = await page.$eval("#poduct_list_area > li:nth-child(3) > a > div > div.name > div > span"
    , ( el ) => el.textContent)
    await page.waitForTimeout(1000)
    
    const location = await page.$eval("#poduct_list_area > li:nth-child(3) > a > div > div.name > p:nth-child(4)",
    ( el ) => el.textContent)
    await page.waitForTimeout(1000)

    const price = await page.$eval("#poduct_list_area > li:nth-child(3) > a > div > div.price > p > b",
    (el) => el.textContent)
    await page.waitForTimeout(1000)
    
    console.log(stage)
    console.log(location.trim())
    console.log(price)

    await browser.close()
}

startCrawling()