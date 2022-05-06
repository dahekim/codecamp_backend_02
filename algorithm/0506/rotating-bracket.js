// 다음 규칙을 지키는 문자열을 올바른 괄호 문자열이라고 정의합니다.

// (), [], {} 는 모두 올바른 괄호 문자열입니다.
// 만약 A가 올바른 괄호 문자열이라면, (A), [A], {A} 도 올바른 괄호 문자열입니다. 
// 예를 들어, [] 가 올바른 괄호 문자열이므로, ([]) 도 올바른 괄호 문자열입니다.
// 만약 A, B가 올바른 괄호 문자열이라면, AB 도 올바른 괄호 문자열입니다. 
// 예를 들어, {} 와 ([]) 가 올바른 괄호 문자열이므로, {}([]) 도 올바른 괄호 문자열입니다.

// 대괄호, 중괄호, 그리고 소괄호로 이루어진 문자열 s가 매개변수로 주어집니다. 
// 이 s를 왼쪽으로 x (0 ≤ x < (s의 길이)) 칸만큼 회전시켰을 때 
// s가 올바른 괄호 문자열이 되게 하는 x의 개수를 return 하도록 solution 함수를 완성해주세요.

const numbering = {
    "[" : 0,
    "]" : 1,
    "{" : 2,
    "}" : 3,
    "(" : 4,
    ")" : 5
}

function solution(s) {
    let answer = 0;
    
    for( let i = 0; i < s.length; i++ ) {
        // 왼쪽으로 한칸씩 밀기
        s = s.substring( 1 ) + s[0];
        const stack = [];
        
        for( let l = 0; l < s.length; l++ ) {
            // 닫힌 괄호인지, 열린 괄호인지를 판단 ( 열림 : 짝수, 닫힘 : 홀수 )
            if( numbering[ s[l] ] % 2 === 0 ) {
                // 열린 괄호만 찾아온다.
                stack.push( numbering[ s[l] ] ) // 숫자로 넣는다.
            
            } else {
                // 닫힌 괄호라면 배열에 열린 괄호가 무조건 있는지 체크
                if( stack.includes( numbering[ s[l] ] - 1 ) ) {
                    const last = stack[ stack.length - 1 ];

                    if( last === numbering[ s[l] ] - 1 ) {
                        stack.splice( stack.length - 1, 1 );
                    }
                    
                } else {
                    // 열린 괄호가 없다면 반복문 중단
                    break;
                }
            }
            
            // 가장 마지막을 체크하면서, 모든 괄호의 짝이 동등하게 맞을 때
            if( l === s.length - 1 ) {
                if( stack.length === 0 ) {
                    answer++;
                }
            }
        }        
    }
    return answer;
}

// reduce 사용한 풀이

const numbering = {
    "[" : 0,
    "]" : 1,
    "{" : 2,
    "}" : 3,
    "(" : 4,
    ")" : 5
}

function solution(s) {
    return s.split("").reduce( (acc, cur, i) => {
        const str = s.substring( i + 1 ) + s.substring( 0, i + 1 );
        
        let fail = false; 
				// 잘못된 경우가 하나라도 있다면 뒤에 있는 코드가 실행되지 않도록 하는 변수
        const stack = str.split("").reduce( (acc2, cur2) => {
            if( fail === false ) {
                if( numbering[ cur2 ] % 2 === 0 ) {
                    // 열린 경우
                    acc2.push( numbering[ cur2 ] );

                } else {
                    // 닫힌 경우
                    if( acc2[ acc2.length - 1 ] === numbering[ cur2 ] - 1 ) {
                        // 열린 괄호가 있는지를 체크
                        acc2.splice( acc2.length - 1, 1 ); // pop()

                    } else if( acc2.includes( numbering[ cur2 ] - 1 ) === false ) {
                        fail = true;
                    }
                }
            }
            return acc2;
        }, [])
        
        return acc += (
            stack.length === 0 && fail === false ? 1 : 0
        );
    }, 0)
}

