// LZW 압축은 다음 과정을 거친다.

// 1. 길이가 1인 모든 단어를 포함하도록 사전을 초기화한다.
// 2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w를 찾는다.
// 3. w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w를 제거한다.
// 4. 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록한다.
// 5. 단계 2로 돌아간다.

// 입력으로 영문 대문자로만 이뤄진 문자열 msg가 주어진다. msg의 길이는 1 글자 이상, 1000 글자 이하이다.
// 주어진 문자열을 압축한 후의 사전 색인 번호를 배열로 출력하라.

function solution(msg) {
    // 글자들의 색인 번호를 저장하는 객체
    const dictionary = {}
    
    // 글자들의 색인 번호를 누적해서 저장
    let number = 1
    for(let i = 65 ; i <=90 ; i++){
        //A(65)~Z(90) 까지의 색인 번호를 저장
        dictionary[ String.fromCharCode(i) ] = number
        number++
    }
    
    const answer = []    
    let str = "" // 여러자리의 글자를 담기 위한 변수
    for(let i = 0; i < msg.length; i++){
        str += msg[i]
        const next = msg[i+1] === undefined ? str : str+msg[i+1]
        
        if( i === msg.length -1 ){
            // 마지막 글자 처리하기
          answer.push( dictionary[str] )  
        } else if ( dictionary[ next ] === undefined ) {
            // 만약에 뒤에 붙어서 가져오는 글자가 사전에 존재하지 않는 다면
            dictionary[ next ] = number
            number++
            
            answer.push( dictionary[str] )
            str = ""
        }
    }
    return answer
}


// reduce를 이용한 풀이 
function solution(msg) {
    // 글자들의 색인 번호를 저장하는 객체
    const dictionary = {}
    
    // 글자들의 색인 번호를 누적해서 저장
    let number = 1
    for(let i = 65 ; i <=90 ; i++){
        //A(65)~Z(90) 까지의 색인 번호를 저장
        dictionary[ String.fromCharCode(i) ] = number
        number++
    }
    let str = ""
    return msg.split("").reduce( ( acc, cur, i ) => {
        str += cur
        const next = str + msg[i+1]
        
        if( dictionary[ next ] === undefined ){
            dictionary[ next ] = number
            number++
            
            acc.push( dictionary[str] )
            str = ""
        }
        
        return acc
    }, [])
}