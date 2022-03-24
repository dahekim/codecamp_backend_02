// module 방식
import { checkValidationPh, getToken, sendTokenToSMS } from "./phone.js";

// commonjs방식
// const { checkValidationPh } = required("./phone")

console.log("안녕하세요!")

function createTokenOfPhone(phNum){
    // 1. 휴대폰 번호 자릿수 맞는지 확인하기 
    const isValid = checkValidationPh(phNum)        // true or false 값으로 나온다면~
    
    if (isValid===true){                                   // true 라면 함수 진행
    // 2. 핸드폰 토큰 6자리 만들기 
    const myToken = getToken()

    // 3. 생성된 토큰을 입력된 핸드폰 번호에 전송하기
    sendTokenToSMS(phNum,myToken)
    }                                               // false라면 1. 에서  createTokenOfPhone 종료
}

createTokenOfPhone("01043438846");