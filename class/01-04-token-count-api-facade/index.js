console.log("안녕하세요!")
function checkValidationPh(phNum){
    if (phNum.length!== 10 && phNum.length!==11){
        console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.")  
        return false
        }else{
        return true
    }
}

function getToken(){
    const mycount = 6
    if (mycount===undefined){
        console.log("에러 발생!! 갯수를 제대로 입력해주세요.")  
        return;
    }    
    else if(mycount<=0){
        console.log("에러 발생!! 갯수가 너무 적습니다.")
        return;
    }
    else if(mycount>=10){   
        console.log("에러발생!! 갯수가 너무 많습니다.")
        return;
    }    
    const result = String(Math.floor(Math.random()*10**mycount)).padStart(mycount,"0")
//  console.log(result);
    return result;
}

function sendTokenToSMS(phNum,myToken){
    console.log(phNum+"으로 인증번호 " +myToken+ "를 전송합니다.")
}


function createTokenOfPhone(phNum){
    // 1. 휴대폰 번호 자릿수 맞는지 확인하기 
    const isValid = checkValidationPh(phNum)        // true or false 값으로 나온다면~
    if (isValid){                                   // true 라면 함수 진행
    // 2. 핸드폰 토큰 6자리 만들기 
    const myToken = getToken()

    // 3. 생성된 토큰을 입력된 핸드폰 번호에 전송하기
    sendTokenToSMS(phNum,myToken)
    }                                               // d아니라면 1. 에서 함수 종료
}

createTokenOfPhone("01043438846");