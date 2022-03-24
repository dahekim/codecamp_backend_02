// 크롤링 대상이 iframe 안에 들어 있으면 어떻게 하지?


import puppeteer from "puppeteer"
import mongoose from "mongoose"

import { Stock } from "./models/stock.model.js"

// 몽고DB 접속!! 
// 일단 먼저 접속 시키고 함수 돌리자!
mongoose.connect("mongodb://localhost:3001/code_camp")




async function startCrawling(){
    
    const browser = await puppeteer.launch( {headless: false} )
    const page = await browser.newPage()
    await page.setViewport( {width: 1280,  height: 720} )
    await page.goto("https://finance.naver.com/item/sise.naver?code=005930")
    await page.waitForTimeout(1000)
    const framePage = await page.frames().find( el => el.url().includes("/item/sise_day.naver?code=005930") ) //iframe 목록을 뽑아옴~ -> 거기서 찾음 -> 여러개의 프레임 하나하나를 element로 잡고 url(iframe의 src)

    for (let i = 3; i <= 7 ; i++){
        await page.waitForTimeout(500)
        const date = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`, 
            (el) => el.textContent )
        
        const price = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
            (el) => el.textContent )


        console.log(` 날짜: ${date}, 가격: ${price}`)

        const stock = new Stock({
            name: "삼성전자",
            date: date,
            price: Number(price.replaceAll(",", ""))              // string으로 들어 있어서 콤마 지우고 숫자 형태로 바꿔줘야함 -> 왼쪽에 있는 ","를 찾아서 ""(공백)으로 변경해줌
        })

        await stock.save()
    }

    await browser.close()
}

startCrawling()