function createTokenOfPhone(phNum){     // 핸드폰 토큰을 생성하는 API
                                        // -> 이름만 봐도 직관적으로 어떤 함수일지 생각할 수 있도록 네이밍


// 1. 휴대폰 번호 자릿수 맞는지 확인하기 
    if (phNum.length!== 10 && phNum.length!==11){      //번호 길이가 10자리가 아니거나 11자리가 아닌 경우 에러 메시지 출력
        console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.")  
        return;
    }

    
    // 2. 핸드폰 토큰 6자리 만들기 
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
    console.log(result);


    // 3. 생성된 토큰을 입력된 핸드폰 번호에 전송하기
    console.log(phNum+"으로 인증번호 " +result + "를 전송합니다.")
}


createTokenOfPhone("01043438846");