// 프로그래머스 https://programmers.co.kr/learn/courses/30/lessons/17682

// 다트 게임은 다트판에 다트를 세 차례 던져 그 점수의 합계로 실력을 겨루는 게임이다.
// 다트 게임의 점수 계산 로직은 아래와 같다.

// 다트 게임은 총 3번의 기회로 구성된다.
// 각 기회마다 얻을 수 있는 점수는 0점에서 10점까지이다.
// 점수와 함께 Single(S), Double(D), Triple(T) 영역이 존재하고 
// 각 영역 당첨 시 점수에서 1제곱, 2제곱, 3제곱 (점수1 , 점수2 , 점수3 )으로 계산된다.

// 옵션으로 스타상(*) , 아차상(#)이 존재하며 
// 스타상(*) 당첨 시 해당 점수와 바로 전에 얻은 점수를 각 2배로 만든다. 

// 아차상(#) 당첨 시 해당 점수는 마이너스된다.
// 스타상(*)은 첫 번째 기회에서도 나올 수 있다. 이 경우 첫 번째 스타상(*)의 점수만 2배가 된다. 

// 스타상(*)의 효과는 다른 스타상(*)의 효과와 중첩될 수 있다. 
// 이 경우 중첩된 스타상(*) 점수는 4배가 된다.

// 스타상(*)의 효과는 아차상(#)의 효과와 중첩될 수 있다. 
// 이 경우 중첩된 아차상(#)의 점수는 -2배가 된다.

// Single(S), Double(D), Triple(T)은 점수마다 하나씩 존재한다.
// 스타상(*), 아차상(#)은 점수마다 둘 중 하나만 존재할 수 있으며, 존재하지 않을 수도 있다.
// 0~10의 정수와 문자 S, D, T, *, #로 구성된 문자열이 입력될 시 총점수를 반환하는 함수를 작성하라.

// 입력 형식 : "점수|보너스|[옵션]"으로 이루어진 문자열 3세트. 예) 1S2D*3T

// 점수는 0에서 10 사이의 정수, 보너스는 S, D, T 중 하나이다.
// 옵선은 *이나 # 중 하나이며, 없을 수도 있다.
// 출력 형식 : 3번의 기회에서 얻은 점수 합계에 해당하는 정수값을 출력한다.

function solution(dartResult) {
    const answer = []
    
    let score = ""      // 점수만 뽑아서 저장하는 변수
    const isBonus = ["S", "D", "T"]     //보너스를 구분하기 위해 배열에 저장
    
    
    for ( let i = 0 ; i < dartResult.length ; i++){
        // Number(dartResult[i])가 NaN이 아니라면서 숫자! 
        // console.log(Number(dartResult[i]), dartResult[i]) 
        
        // 숫자 타입으로 변환한 데이터의 결과가 NaN 값이 아닌 경우 (= 숫자가 맞는 경우)
        if(isNaN( dartResult[i] ) === false){
            score +=dartResult[i]
            // console.log(Number(dartResult[i]))
            
        } else {    
            // 숫자 타입으로 변환한 데이터의 결과가 NaN인 경우 (= 숫자가 아닌 경우)
            // 옵션과 보너스 값을 받아온다!
            // console.log(dartResult[i])    
            if( isBonus.includes( dartResult[i] ) ){
                // 보너스 처리("S", "D", "T")
                score = Number(score)
                
                if (dartResult[i] === "D"){
                    // 더블일 경우에는 2제곱
                    score = score**2
                    // score = Math.pow(score,2)
                } else if ( dartResult[i] ==="T"){
                    // 트리플인 경우에는 3제곱
                    score = score**3
                    // score = Math.pow(score,3)
                }
                
                answer.push( score )
                score = ""
            } else {
                // 옵션 처리 ("*" or "#")
                if( dartResult[i] === "#"){
                    // 아차상인 경우: 해당 점수를 마이너스
                    answer[ answer.length-1 ] *= -1
                } else {
                    // 스타상인 경우: 해당 점수에 2를 곱함
                    answer[ answer.length-1 ] *= 2
                    
                    if (answer.length >1 ) {
                        // 앞에 있는 점수까지 2배로 만들어준다
                        answer[ answer.length -2 ] *= 2
                    }
                }
            }
        }
    }
    return answer.reduce( ( acc,cur ) => acc + cur )
}

// reduce()를 사용한 풀이, 문자열인 dartResult를 spilt()을 이용해서 배열로 변환한 뒤 진행!

const isBonus = ["S", "D", "T"]     //보너스를 구분하기 위해 배열에 저장

function solution(dartResult) {
    
    let score = ""       // 문자열에 있는 점수 데이터 저장
    let currentScore = 0 // 현재 게임의 점수를 저장
    let last = false     // 점수를 최종 저장할 시점을 찾음
    
    const answer = dartResult.split("").reduce( ( acc, cur, i ) => {
        if( isNaN( cur ) === false ){
            // 점수를 먼저 뽑는다.
            score += cur
            last = false // 새 게임 시작!
            
        } else if ( isBonus.includes( cur ) ) {
            // 보너스 처리
            score = Number( score )
            const squared = isBonus.indexOf( cur ) +1
            
            currentScore = score ** squared
            score = ""              // 점수를 저장하는 변수를 초기화
            
            if( isNaN( dartResult[ i + 1 ] ) === false || // 옵션이 없는 경우
              (i+1) === dartResult.length )  // 마지막 데이터 체크
            {
                
                // 현재 게임이 여기서 종료
                last = true 
            }
            
        } else {
            last = true
            // 옵션처리
            if ( cur === "*" ){
                // 스타상
                currentScore *= 2
                
                if( acc.length > 0){
                    acc [acc.length -1] *= 2
                }
                
            } else {
                // 아차상
                currentScore *= -1
            }
        }
        
        if( last ) {    // 턴이 종료되었다면 최종적으로 점수를 저장
            acc.push( currentScore )    
        }
        
        return acc
    }, []).reduce( ( acc, cur ) => acc + cur )
    return answer
}