// 괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다.
/*
"()()" 또는 "(())()" 는 올바른 괄호입니다.
")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
*/

// '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 
// 문자열 s가 올바른 괄호이면 true를 return 하고, 
// 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

// 문자열 s의 길이 : 100,000 이하의 자연수
// 문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

// 내 코드~ 효율성 통과 못했다 와이?
function solution(s){
    let answer = true
    const arr = s.split("")
    const result = {}
    arr.forEach((x) => {
        result[x] = (result[x] || 0) + 1
    })

    // "(" 로 시작 안하거나 ")" 로 안 끝나면 false
    if(s[0] !== "(" || s[s.length-1] !== ")") return false		
		// "(" 와 ")"의 총 합 갯수가 다르면 false
    if(result['('] !== result[')']) return false

		
  return answer
}


// 멘토님 코드 
// 효율성에서 실패! 흑
function solution(s){
    const limit = s.length/2
    for(let i = 0 ; i < limit ;i++){
        s = s.replace("()", "")
    }
    return s === ""
}

// 효율성 통과하는 코드
function solution(s){
    // 첫 문자열이 닫혀있거나 마지막이 열려있다면 false
    if(s[0] ===")" || s[s.length -1] === "(") return false
    
    let depth = 0  // 위에서 첫번째 값이 "("이 아닌 경우 다 잡아서 depth, i를 1로 설정해도 통과
    for (let i = 0 ; i < s.length; i++){
        // 열려있다면 1을 더한다
        if( s[i] === "(" ) depth++
        else if (s[i] === ")"){
        // 닫혀있다면 1을 뺀다
            depth--
            if (depth < 0) return false
        }
    }
    return depth === 0
}

// reduce()와 스위치 변수 사용한 풀이 
function solution(s){
    // 첫 문자열이 닫혀있거나 마지막이 열려있다면 false
    if(s[0] ===")" || s[s.length -1] === "(") return false
    
    let fail = false
    const answer = s.split(""). reduce( ( acc,cur )=>{ 
        if (acc < 0) {
            fail = true
        }
        return acc + ( cur === "(" ? 1 : -1)
    }, 0)
    return answer === 0 && !fail  
}