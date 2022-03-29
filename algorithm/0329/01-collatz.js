// 1937년 Collatz란 사람에 의해 제기된 이 추측은, 주어진 수가 1이 될때까지 다음 작업을 반복하면, 모든 수를 1로 만들 수 있다는 추측입니다. 
// 1-1. 입력된 수가 짝수라면 2로 나눕니다. 
// 1-2. 입력된 수가 홀수라면 3을 곱하고 1을 더합니다.
// 2. 결과로 나온 수에 같은 작업을 1이 될 때까지 반복합니다.
// 예를 들어, 입력된 수가 6이라면 6→3→10→5→16→8→4→2→1 이 되어 총 8번 만에 1이 됩니다. 
// 위 작업을 몇 번이나 반복해야하는지 반환하는 함수, solution을 완성해 주세요. 단, 작업을 500번을 반복해도 1이 되지 않는다면 –1을 반환해 주세요.



// 1이 나올 때까지 반복문 돌리기
function solution(num){
    let answer = 0 

    for ( let i = 0; i < 500 ; i ++){
        // num의 값이 1이라면 반복문을 중단한다
        if (num === 1){
            break;
        } answer ++
        
        // 짝수
        if( num % 2  === 0){
            num /= 2                    // num = num / 2
        }

        //홀수
        else {
            num = (num *= 3) +1         // num = (num*3)+1
        }
    }
    // 500번을 반복해도 num의 값이 1이 되지 않았다면 -1을 반환,
    // 1이 되었다면 횟수를 리턴
    return num !== 1 ? -1 : answer      // return -1;
}

// reduce() 사용 (연산된 데이터) 1이 될 때까지 반복해서 그 누적된 결과값을 가져온다
// 배열 필요
function solution(num) {
    let answer = 0

    const countReduce = new Array( 500 )        // 500개의 빈 배열 만들기
                            .fill(1)
                            .reduce(  ( acc, cur )  => {
                                if ( acc !== 1 ){     // 로직을 멈추기 위한 조건문, 1을 만나면 리턴하는 조건문
                                answer++
                                return ( acc % 2 === 0 ) 
                                    ? acc / 2
                                    : (acc*3) +1
                                } else {
                                    return 1 }   // acc
                            }, num )             // 초기값 num, 이 num이 acc로 들어간다! 
                        return countReduce !== 1? -1 : answer
                        }

