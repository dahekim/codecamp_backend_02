// 내가 좋아하는 사이트를 스크래핑
// 관련 오픈그래프 (og) 메타 태그 정보를 다른 정보들과 함께 User DB에 저장
// 주소를 스크래핑해서 가져온 오픈 그래프들을 저장

import axios from "axios"
import cheerio from "cheerio"


export async function getOgAPI(inputUrl){
    if( inputUrl.includes("http") ){
        const targetUrl = inputUrl.split(" ").filter( (el) => el.startsWith("http"))[0]
        return targetUrl
    }
    else 
    {
        const targetUrl = "https://" + inputUrl
        return targetUrl
    }


    const preferSite = await axios.get(targetUrl)       
    const $ = cheerio.load(preferSite.data)
    let result = {}
    
    $("meta").each( ( _, el ) => {
        if($(el).attr('property')) {       // $ el에서 속성이 property 인거 있으면 { }에 있는 내용 실행 

            const key =  $(el).attr('property').split(":")[1]
            // ":"를 기준으로 속성이 property인 태그의 거기서 1번째 인덱스를 가져오고 그걸 key로 받음 

            const value =  $(el).attr('content') 
            // =>속성이 content인 태그를 받아와서 그걸 value에 넣을거야
            result[key] = value
        }
    })
    console.log( '결과 : ', result )
    return result
}