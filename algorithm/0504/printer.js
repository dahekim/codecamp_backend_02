// 현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 
// 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 
// 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.

// 현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
// 인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
// location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며
// 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.

// 하다 만 코드 ㅠㅠ
function solution(priorities, location) {
    let answer = 0
    let max = Math.max(...priorities)
    let min = 0
    let idx = priorities.indexOf(max)
    
    
    // 내가 인쇄를 요청한 문서의 중요도가 가장 높을 때
    if(idx === location) return 1
    
    for( let i = 0 ; i < priorities.length ; i++ ){
        for(let j = i+1 ; j < priorities.length ; j++){
            // 배열에 자기보다 중요도가 큰 값이 있으면 해당 값을 shift하고 배열에 push하기 
            if( priorities[i] < priorities[j] ){
                min = priorities[i]
            
                priorities.shift()
                priorities.push(min)
            }
        }
        console.log(priorities)
    }
}

function solution(priorities, location) {
    const origin = priorities[ location ]
    // 내가 뽑을 문서가 어떤 위치에 있는지 특정한 문자로 지정
    priorities[location] = "a"
    
    let answer = 1
    while( true ) {
        const search = priorities.indexOf( "a" )
        priorities[ search ] = origin
        const max = Math.max(...priorities)
        priorities[ search ] = "a"
        
        if( priorities[0] === "a"){
            if( origin === max ) return answer++
        }
        
        if( priorities[0] !== max ){
            // 더 큰 우선순위의 문서가 있다면 배열 뒤로 보낸다
            priorities.push( priorities[0] )
            priorities.shift()
            
        } else {
            // 앞에 있는 문서가 가장 큰 우선순위를 가진다면 인쇄
            priorities.shift()
            answer++
        }      
    }
}

// 재귀함수 사용한 풀이

function solution(priorities, location) {
    const origin = priorities[ location ]
    // 내가 뽑을 문서가 어떤 위치에 있는지 특정한 문자로 지정
    priorities[location] = "a"
    
    const recursion = ( count ) => {
        const search = priorities.indexOf("a")
        priorities[ search ] = origin
        const max = Math.max(...priorities)
        priorities[ search ] = "a"
        
        if( priorities[0] === "a" && origin === max) {
            return ++count            
        }
        
        priorities[0] === max ? count++ : priorities.push( priorities[0] )
        priorities.shift()
        
        return recursion( count )
        
    }
    return recursion( 0 )
}