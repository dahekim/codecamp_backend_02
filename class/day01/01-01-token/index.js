console.log("안녕~");
// ################################################################################
function getToken(){
    const result = String(Math.floor(Math.random()*1000000)).padStart(6,"0");
    console.log(result);
}
//6자리 토큰만 만들 수 있는 함수

getToken();
// ################################################################################
function add(){         // 함수 선언
    const a=1
    const b=2

    const result = a+b
    console.log(result)
}
add()                      // 함수 실행
// ################################################################################

function add1(a,b){         //더하고 싶은 값을 함수 실행문에서 받아옴, a와 b는 매개변수(parameter)
    const result = a+b
    console.log(result)
}                           // '{ }'를 넘어가면 매개변수 a,b는 사용하지 못함 = a와 b의 적용 범위(scope)는 중괄호


add1(2,3)                   //더하고 싶은 값을 지정, 여기서 2와 3은 인자(argument)