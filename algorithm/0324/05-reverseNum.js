// 자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 
// 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

function solution(n) {
    const answer = []
    n = String(n)
    
    for ( let i = n.length -1 ; i>= 0 ; i-- )  // ( 마지막 데이터의 인덱스 ; i가 0까지 ; i를 감소)
    {
        answer.push( Number(n[i]) )
    }
    return answer
}

// 메소드 이용
// toString(), split(), reverse(), map()

function solution(n) {
    return n.toString().split("").reverse().map( ele => {
        return Number(ele)
    })
}