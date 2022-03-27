//import mongoose from 'mongoose'
import puppeteer from "puppeteer"

//const port = 3005
/*
// 스타벅스 커피목록 크롤링 API
app.get("/starbucks", async (req, res) => {
    const coffeeList = await Starbucks.find()

    const menu = new Starbucks ({
        name,img})
        
        await stocks.save()

    console.log(menu)

    res.send(coffeeList)
})
*/
startCrawling()

async function startCrawling(){
    // 퍼펫티어로 크로미움 실행 
    const browser = await puppeteer.launch( {headless: true} )                     
    const page = await browser.newPage()                                            
    await page.setViewport( {width: 1280,  height: 720} )                           
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do")
    
    // 접속 하고 텀 주기
    await page.waitForTimeout(300)

    // 크로울링 
    // page의 ("~") 셀렉터로 이동해서 요소의 textContent를 가져와서 검증 > name, img에 넣기

    const name = await page.$eval("#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(1) > dl > dd"
            , ( el ) => el.textContent)
            await page.waitForTimeout(300)
    const img = await page.$eval("#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(1) > dl > dt > a > img"
    , ( el ) => el.src)
    await page.waitForTimeout(300)
    console.log(name)
    console.log(img)
    
/*
    for (let i = 1 ; i <=10 ; i++)
        {
            
            
        }
*/

    await browser.close()
}



/*
// 몽고DB 접속!! 
mongoose.connect("mongodb://my-database:27017/mini_project")

app.listen(port, () => {
    console.log(`########################################`)
    console.log(`##Example app listening on port ${port}##`)
    console.log(`###스타벅스 커피 목록 크롤링 API 실행중###`)
    console.log(`########################################`)
})
*/