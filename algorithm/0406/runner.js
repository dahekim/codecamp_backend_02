// 수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.
// 마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

// 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
// completion의 길이는 participant의 길이보다 1 작습니다.
// 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
// 참가자 중에는 동명이인이 있을 수 있습니다.

// 동명이인 안 걸러지는 내 코드...

function solution(participant, completion){
    let answer =""
    for ( let i = 0 ; i < participant.length ; i++ ){
        if( completion.includes( participant[i] ) === false ) {
            return answer = participant[i]
        }
    }
    return answer
}
// includes() , splice(), indexOf() 사용, 효율성 검사는 통과 못함
function solution(participant, completion){
    for (let i = 0 ; i < completion.length; i++ ){
        if( participant.includes( completion[i]) ) {
            participant.splice(
                participant.indexOf( completion[i] )  // completion[i] 값의 인덱스부터 1개 제거
                , 1 )
        }
    }
    return participant[0]
}


function solution(participant, completion){
    // 선수들의 명단과 완주자 명단을 오름차순
    participant.sort( (a,b) => a > b ? 1: -1)
    completion.sort( (a,b) => a > b ? 1: -1)
    
    let answer=""
    for(let i = 0 ; i< participant.length ; i++){
        if ( participant[i] !== completion[i] ){
            answer = participant[i]
            break           // 처음 발견하면 빠져나오게!
        }        
    }
    return answer
}

// > 리팩토링
function solution(participant, completion){
    // 선수들의 명단과 완주자 명단을 오름차순
    participant.sort( (a,b) => a > b ? 1: -1)
    completion.sort( (a,b) => a > b ? 1: -1)
    
    for(let i = 0 ; i< participant.length ; i++){
        if ( participant[i] !== completion[i]) {
            return participant[i]
        }        
    }
}

// filter() 사용
function solution(participant, completion){
    // 선수들의 명단과 완주자 명단을 오름차순
    participant.sort( (a,b) => a > b ? 1: -1)
    completion.sort( (a,b) => a > b ? 1: -1)
    
    const answer = participant.filter( (name,i) => {
        return name!=completion[i]
    })
    return answer[0]
    }

// > 리팩토링

function solution(participant, completion){
    // 선수들의 명단과 완주자 명단을 오름차순
    participant.sort( (a,b) => a > b ? 1: -1)
    completion.sort( (a,b) => a > b ? 1: -1)
    
    return participant.filter( (name,i) => {
        return name!=completion[i]
    })[0]
}