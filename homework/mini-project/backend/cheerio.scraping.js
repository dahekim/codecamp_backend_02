// 내가 좋아하는 사이트를 스크래핑
// 관련 오픈그래프 (og) 메타 태그 정보를 다른 정보들과 함께 User DB에 저장
// 주소를 스크래핑해서 가져온 오픈 그래프들을 저장

import axios from "axios"

export async function createUsersAPI(myData){
    const targetUrl = myData.prefer.split(" ").filter( (el) => el.startsWith("http"))[0]    

    const preferSite = await axios.get(targetUrl)       
    const $ = cheerio.load(preferSite.data)
    
    $("meta").each( ( _, el ) => {
        if($(el).attr('property')){       // $ el에서 속성이 property 인거 있으면 {}안에 있는 내용 실행시켜줘 

            const key =  $(el).attr('property').split(":")[1]
            //태그를 컨트롤할거야 -> 속성이 property인 걸로 -> ":"를 기준으로 나눌거야 -> 거기서 1번째 인덱스(title)를 가져오고 그걸 key로 받으려고 해 

            const value =  $(el).attr('content') 
            // => 태그에서 속성이 content인 걸 받아올거고 그걸 value에다가 넣을거야
            
            console.log(key, value)

        }
    })
}