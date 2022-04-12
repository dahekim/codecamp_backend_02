// 어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다.
// 예를 들어 "AB"는 1만큼 밀면 "BC"가 되고, 3만큼 밀면 "DE"가 됩니다. 
// "z"는 1만큼 밀면 "a"가 됩니다. 
// 문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.

// 공백은 아무리 밀어도 공백입니다.
// s는 알파벳 소문자, 대문자, 공백으로만 이루어져 있습니다.
// s의 길이는 8000이하입니다.
// n은 1 이상, 25이하인 자연수입니다. 


const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function solution(s,n){
    let answer = ""
    function solution(s,n){

        for(let i = 0 ; i < s.length ; i++) {
            if(s[i] === " ") {
                answer += s[i] // " "
            } else {
                let idx = alphabet.indexOf( s[i] )
                const word = idx>25 ? alphabet.substring(26) //대문자
                                    : alphabet.substring(0,26) //소문자
                idx = word.indexOf(s[i]) +n

                if (word[idx] === undefined){
                    idx -=26
                }
                answer ==word[idx]
            }
        }
        return answer
    }
}

// 문자열 2개로 나눈 풀이

const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function solution(s,n){
    let answer = ""
    
    for(let i = 0; i <s.length; i++){
        if(s[i] === " "){
            answer +=s[i]
        } else {
            const word = lower.includes(s[i]) ? lower : upper
            let idx = word.indexOf(s[i]) + n
            
            if(word[idx] === undefined){
                idx -=26
            }
            answer +=word[idx]
        }
    }
    return answer
}

// reduce() 사용한 풀이

const lower2 = 'abcdefghijklmnopqrstuvwxyz'
const upper2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function solution(s,n){
    const answer = s.split("").reduce((acc,cur)=> {
        const word = lower.includes(cur) ? lower2 : upper2
        let idx = word.indexOf([cur]) + n
        
        if( idx >= 26){
            idx -=26
        } 
        return acc + (
            cur === " " ? " " : word[idx]
        )

    }, "")
    return answer
}

// 아스키 코드 이용한 풀이
// charCodeAt() : 문자의 유니코드 데이터(번호)를 리턴
//String.fromCharCode() : 유니코드 데이터(번호)를 문자로 리턴 

// 대문자 : 65 ~ 90
// 소문자 : 97 ~ 122
function solution(s,n){
    let answer = ""
    for (let i = 0 ; i < s.length; i++){
        if (s[i] === " ") {
            answer += " "
        }
        else {
            let idx = s[i].charCodeAt() + n
            // 소문자 z를 넘어간다거나
            // 대문자 Z를 넘어간다거나 기존의 idx 값이 소문자인 경우
            if (idx > 122 || ( idx > 90 && (idx - n) < 97 )){
                idx -=26
                }
            answer += String.fromCharCode(idx);
        }
    }
    return answer
}