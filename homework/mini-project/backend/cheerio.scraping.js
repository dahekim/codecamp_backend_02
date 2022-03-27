// 내가 좋아하는 사이트를 스크래핑
// 관련 오픈그래프 (og) 메타 태그 정보를 다른 정보들과 함께 User DB에 저장
// 주소를 스크래핑해서 가져온 오픈 그래프들을 저장

import axios from "axios"
import Cheerio from "cheerio"


export async function getOgAPI(inputUrl) {
    const openGraph = {
        title: "",
        description: "",
        image: "" 
    }

    // 문자열에 http가 들어가있는지 확인
    if( inputUrl.includes( "http" ) ) {
        let httpOg=""
        // 빈칸 기준으로 쪼개고 쪼갠 부분을 돌면서 시작하는 부분이 http인 부분을 httpOg 담음
        inputUrl.split(" ").forEach( (el) => {
            if ( el.startsWith( "http" ) ) {
                httpOg = el 
            }
        })

        const rawOg = await axios.get(httpOg)
        const $ = Cheerio.load(rawOg.data)

        $( "meta" ).each( ( _, el ) => {
            // $ el의 속성이 property 인 것이 없다면 종료
            if ( !$(el).attr( "property" ) ) return
        
        // ":"를 기준으로 속성이 property인 태그의 거기서 1번째 인덱스를 가져오고 key로 받음
        const key = $(el).attr("property").split(":")[1]
         // 속성이 content인 태그를 받아와서 content에 넣음
        const content = $(el).attr("content")
        openGraph[key] = content

        return openGraph }) 
    }
}