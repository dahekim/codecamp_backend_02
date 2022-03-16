// switch 문법
const day = "월요일"
let result =""
switch(day){ // () 안에 상수값 들어감, 해당 데이터 기준으로 조건 판단
  
  case "월요일" :
    result = "오늘은 월요일입니다."
//    break
  case "화요일":
    result ="오늘은 화요일입니다."
//   break
  case "수요일":
    result ="오늘은 수요일입니다."
//    break
  case "목요일":
    result ="오늘은 목요일입니다."
//    break
  case "금요일":
    result ="오늘은 금요일입니다."
//    break
    
// default - 자동으로 위의 case에 break 걸어줌, if-else구문의 else 역할
// default는 스위치 문 하단에 있어야 한다~
  default :													
    result = "오늘은 " +day+ "입니다."
}

console.log(result)

// 여러개의 결과를 거치고 싶을 때 switch문 사용