// 정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요.
// 단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요.
// 예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴하고, [10]면 [-1]을 리턴합니다.

solution( [4,3,2,1] ) // [4, 3, 2]
solution( [10] )    //[-1]

function solution( arr ) {
    const answer = []

    // 비교 대상을 할당
    // 제일 작은 값을 찾기 위한 for 문
    let min = arr[0]        // arr의 첫 번째 요소와 비교
    for ( let i = 1 ; i < arr.length ; i ++){       // arr[0]이 min 값이기 때문에 i가 굳이 0으로 시작할 필요 없으므로 i 초기값을 1로 지정

        if( arr[i] < min) { 
            min = arr[i]
        }
    }
    // 제일 작은 값을 제외한 값을 배열에 넣기 위한 for문
    for  (let i = 0 ; i < arr.length ; i++ ) {
        if ( arr[i] > min ){
            answer.push( arr[i] )
        }
    }
    // 빈 배열인지 검증
    return answer.length === 0 ? [-1] : answer  
}



// 메소드를 사용한 코드 리팩토링, 최솟값 찾는 메소드와 필요한 데이터만 걸러서 가져오는 메소드 사용 ( Math.min(), filter() )
// 받아오는 값이 배열 형태이므로 스프레드 연산자(...) 사용해서 배열의 요소 전체 데이터 자체가(',' 포함ㅎ) ( ) 안으로 들어오게 된다
function solution( arr ) {
    
    const min = Math.min( ...arr )              // Math.min()을 이용했기 때문에 상수값으로 할당이 가능

    const answer = arr.filter ( num => {
        return num !== min                      // num > min
    })    
    // 빈 배열인지 검증
    return answer.length === 0 ? [-1] : answer  
}