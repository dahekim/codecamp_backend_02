// 문자열 s는 한 개 이상의 단어로 구성되어 있습니다.
// 각 단어는 하나 이상의 공백문자로 구분되어 있습니다.
// 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.

// 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단해야합니다.
// 첫 번째 글자는 0번째 인덱스로 보아 짝수번째 알파벳으로 처리해야 합니다.

function solution(s) {
    let idx = 0
    var answer = '';
    
    for ( let i = 0 ; i <s.length ; i++){
        if (s[i] === " "){          // 공백은 공백으로 받아오기
            answer += s[i]          // === " "
            idx = 0                 // 공백을 만났을 때 idx 값을 초기화
        }
        
        else {   
            answer += idx %2 ===0
            ? s[i].toUpperCase()
            : s[i].toLowerCase()
            idx++
        }
    }
    return answer;
}

// map 두번 사용해서 각각의 인덱스로 분리해서 불러오는 방법
// 각각의 요소들을 배열형태로 받아오기 

function solution(s) {
    const answer = s.split(" ").map( str => {
        return str.split("").map( (letter, i) => {
            return i % 2 === 0
            ? letter.toUpperCase()
            : letter.toLowerCase()
        }).join("")
    }).join(" ")
    return answer
}

