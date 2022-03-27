import puppeteer from "puppeteer"
import mongoose from 'mongoose'

import { Starbucks } from "./models/starbucks.model.js" 

mongoose.connect("mongodb://localhost:27117/mini_project")

async function startCrawling(){
    // 퍼펫티어로 크로미움 실행 
    const browser = await puppeteer.launch( {headless: false} )                     
    const page = await browser.newPage()                                            
    await page.setViewport( {width: 1280,  height: 720} )                           
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do")
    await page.waitForTimeout(300)

    // 크롤링
    // page의 ("~") 셀렉터로 이동해서 요소의 textContent를 가져와서 검증 > name, img에 넣기
    // 스타벅스 메뉴 리스트에서 10개 크롤링
    
    for (let i = 2; i<=11 ; i++){
        const name = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dd`
        , ( el ) => el.textContent)
        
        const img = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dt > a > img`
        , ( el ) => el.src)
        await page.waitForTimeout(300)

        const coffeelist = new Starbucks({ 
            name: name, 
            img: img            
        })
        console.log(coffeelist)
        await coffeelist.save()        
    }

    await browser.close()
}
startCrawling()