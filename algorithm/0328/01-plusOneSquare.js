// 임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다.
// n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.

solution(121)   // 144
solution(3)     //-1


// for문을 이용한 풀이
function solution(n){
    // 초기 값으로 제곱이 아닐 경우를 먼저 넣어주고,
    // 로직을 통해 제곱이 맞을 경우에는 제곱근을 넣어준다.
    let answer = -1
    for ( let i = 1 ; i * i <= n ; i++ ){
        if( i*i === n) {
            // 제곱근을 찾은 경우
            answer = i +1 ;
            return answer * answer
        }
        //console.log( i, i*i )
    }
    return answer 
}

// 거듭제곱 연산자 사용한 풀이 ( (**), Math.pow() )
function solution(n){
    let answer = -1
    for ( let i = 1 ; i ** 2  <= n ; i++ ){         // i를 2제곱
        if( i*i === n) {
            // 제곱근을 찾은 경우
            answer = i +1 ;
            return answer * answer
        }
        //console.log( i, i*i )
    }
    return answer 
}

//while문 사용한 풀이

function solution(n){
    let answer = 1; // 최초식

    while( answer ** 2 < n ){       // 조건식, answer을 2제곱한 값이 n보다 작을 때까지 돌리기~
        answer++    // 증감식
    }
    // 제곱근을 찾았다면 1을 더한 값을 제곱해서 리턴하고,
    // 제곱근이 아니라면 -1을 리턴
    return answer **2 === n
    ?( answer + 1) **2
    : -1
}


// 제곱근을 찾아주는 메소드, 정수인지 아니인지 판별하는 메소드를 사용한 풀이 
// ( Math.sqrt(), Number.isInteger() )
// 메소드 사용해서 반복문 사용 줄이기~! 
function solution(n){
    let answer = Math.sqrt(n)       //  정수로 떨어진다면 제곱근, 소수라면 제곱근 아님
    if ( Number.isInteger( answer ) === true ) {
        // 정수가 맞는 경우 (제곱근인 경우)
        answer +=1
        return answer ** 2
    }
    else {
        // 정수가 아닐 경우 (제곱근이 아닐 경우)
        return -1
    }
}

// 바로 위의 코드 리팩토링
function solution(n){
    return Number.isInteger( Math.sqrt (n) )
    ? ( Math.sqrt( n ) + 1 ) ** 2           // 제곱근에 +1한 값의 제곱
    : -1                                    // 제곱근 아니니까 -1 리턴
}