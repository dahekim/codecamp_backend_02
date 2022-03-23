//문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
// s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

function solution(s) {
    return  answer = s.split('').sort().reverse().join('')
}

function solution(s){
    //const answer = []
    const answer = Array.from(s)
    answer.sort((a,b)=> {
        return a> b? - 1 : 1
    })

/*     for (let i = 0 ; i < s.length ; i++){
        answer.push(s[i])
    }
    const answer = s.split("") */

/** 
/*    
    arr.sort( (a ,b )=> {
        return a >b ? 1 :-1  //오름차순
//    return a >b ? -1 : 1  //내림차순
    })
*/
    return answer.join("")
}
function solution(s){
    return Array.from(s).sort((a,b) =>{
        return a > b? -1: 1
    }).join("")
}