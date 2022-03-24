import axios from "axios";

// 비동기 방식
function fetchPost(){
    const result = axios.get("https://koreanjson.com/posts/1") // 여기 url로 가서 데이터 받아와~
    console.log("############################################################")
    console.log(result)         // Promise{ <pending> } ----응답 결과 기다리는 중~
    console.log("############################################################")
}

fetchPost() //실행 명령



// 동기 방식
async function fetchPost2(){
    const result = await axios.get("https://koreanjson.com/posts/1")
    console.log("############################################################")
    console.log(result)         // 실제 데이터
    console.log(result.data.title)         // 실제 데이터 중 title만 뽑기
    console.log("############################################################")
}

fetchPost2() // 실행명령