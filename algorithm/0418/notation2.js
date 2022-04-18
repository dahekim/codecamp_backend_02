// 0과 1로 이루어진 어떤 문자열 x에 대한 이진 변환을 다음과 같이 정의합니다.
/*
x의 모든 0을 제거합니다.
x의 길이를 c라고 하면, x를 "c를 2진법으로 표현한 문자열"로 바꿉니다.
예를 들어, x = "0111010"이라면, 
x에 이진 변환을 가하면 x = "0111010" -> "1111" -> "100" 이 됩니다.
*/
// 0과 1로 이루어진 문자열 s가 매개변수로 주어집니다. 
// s가 "1"이 될 때까지 계속해서 s에 이진 변환을 가했을 때, 
// 이진 변환의 횟수와 변환 과정에서 제거된 모든 0의 개수를 각각 배열에 담아 return 하도록 solution 함수를 완성해주세요.

// s의 길이는 1 이상 150,000 이하입니다.
// s에는 '1'이 최소 하나 이상 포함되어 있습니다.

function solution(s) {
    let count = 0   // 총 시도한 횟수
    let remove = 0   // 0이 제거된 총 횟수
    
    // s가 1이 되지 않을 때까지 (s가 1이 되면 반복문이 중단된다)
    while( s !== "1" ) {
        count++        
        
        // 0을 제거하는 반복문, 0을 발견하면 remove 변수값이 1씩 증가,
        // 조건문 바깥쪽으로 "1"만 담는 변수 temp
        let temp=""
        for( let i = 0; i <s.length ; i++ ){
            if(s[i] === "0"){
                // "0"을 발견했다면, temp에 "0"을 넣지 않는다
                remove++
                continue
            }
            // temp에는 "1"만 담는다.
            temp +=s[i]
        }
        s = temp.length
        // s를 이진법으로 변환한 데이터의 결과가 "1"이라면 반복문 종료
        s = s.toString(2)
    }
    return [count, remove]
}

// 재귀함수를 이용한 풀이

function solution(s) {
    let [ count, remove ] = [ 0,0 ]
    
    function recursion(){
        // 반복문을 중단시키는 조건문 설정, s가 "1을 만나면 반복문을 끊어준다!
        if( s  === "1"){
            return [count,remove]
        }
        
        // "0"을 제거한 문자열의 길이 값을 remove에 넣음
        // el이 0인 데이터만 남긴다
        remove += s.split("").filter(el => el === "0").length
        // 0이 제거되고 1만 남은 문자열의 길이값을 이진법으로 변환
        s = s.split("").filter(el => el === "1").length
        s = s.toString( 2 )
        
        count++
        return recursion()
    }
    
    // recursion()이 리턴하는 값을 바로 리턴
    return recursion()
}