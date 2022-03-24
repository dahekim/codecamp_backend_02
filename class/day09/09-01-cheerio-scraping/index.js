// 제목과 내용을 DB에 저장하고 저 주소를 스크래핑해서 가져온 오픈 그래프들을 저장하자 미리보기를 보여줘야되니까
//메타태그 스크래핑 해오기

import axios from "axios"
import cheerio  from "cheerio"


async function createBoardAPI(myData){
    // myData 안의 key값이 contents인 것에서 어떻게 http://~를 찾을거야?
    // split(" ")으로 배열을 만들고 http://로 시작하는 걸 필터링으로 찾자
    // 요소에서 시작 단어가 "http"인 걸 찾아줘 그 배열의 0번째가 targetUrl이야
    const targetUrl = myData.contents.split(" ").filter( (el) => el.startsWith("http"))[0]        
    

    const aaa = await axios.get(targetUrl)       // " "안에 API End-Point 주소 적기(하드코딩인 경우) 아니면 
    const $ = cheerio.load(aaa.data)       // aaa의 data만 가져오자
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
const frontendData = {
    title: "안녕하세요",
    contents: "쉬는시간 언제인가요 네이버는 http://naver.com 이에요"
}
createBoardAPI(frontendData)