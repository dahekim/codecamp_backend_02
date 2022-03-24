/*
function getToken(){
    const result = String(Math.floor(Math.random()*1000000)).padStart(6,"0");
    console.log(result);
}
*/
// 6자리 토큰만 만들 수 있는 함수

function getToken(n){
    //undefined
    //null
    //n = null

    if (n===undefined){
        console.log("에러 발생!! 갯수를 제대로 입력해주세요.")  // 아무것도 입력하지 않으면 에러 메시지 출력
        return;         // 아래 함수 동작하지 않도록 리턴 기입
    }
    
    else if(n<=0){
        console.log("에러 발생!! 갯수가 너무 적습니다.")        // 0보다 작은 수를 입력하면 에러 메시지 출력
        return;         // 아래 함수 동작하지 않도록 리턴 기입
    }

    else if(n>=10){   
        console.log("에러발생!! 갯수가 너무 많습니다.")         // 10보다 큰 수를 입력하면 에러 메시지 출력
        return;         // 아래 함수 동작하지 않도록 리턴 기입
    }
    
    const result = String(Math.floor(Math.random()*10**n)).padStart(n,"0");
    console.log(result);
}
// n자릿수의 토큰을 만들 수 있는 함수 (재사용성 ↑)

getToken(5);

