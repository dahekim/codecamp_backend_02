// 채팅방에 들어오고 나가거나, 닉네임을 변경한 기록이 담긴 문자열 배열 record가 매개변수로 주어질 때, 
// 모든 기록이 처리된 후, 최종적으로 방을 개설한 사람이 보게 되는 메시지를 
// 문자열 배열 형태로 return 하도록 solution 함수를 완성하라.


function solution(record) {
    const users= {}
    const answer = []
    
    for ( let i = 0; i < record.length ; i++ ){
        const infos = record[i].split(" ")
        // 닉네임을 변경한 적이 있다면 (2번째 인덱스에 값이 있다면)
        // 키가 uid[~]인 객체에 변경한 닉네임을 value 값으로 지정한다  
        if( infos[2] ){
            users[ infos[1] ] = infos[2]
        }
        
        // 
        if( infos[0] !== "Change" ){
            // uid 라는 키값으로 각각 유저의 고유한 유저 아이디를 넘김
            // 닉네임을 변경하지 않은 경우에는 유저가 한 액션이 action 키값에 들어온다
            answer.push({ uid: infos[1], action: infos[0] })
        }
        
    }
    for ( let idx in answer ) {
        answer[idx] = users[answer[idx].uid] + (answer[idx].action === "Enter"
                   ? "님이 들어왔습니다." : "님이 나갔습니다.")
    }
    return answer
}

// reduce() 사용한 풀이

function solution(record) {
    // 초기값으로 record를 split한 데이터를 미리 가져오기~
    record = record.map(el => el.split(" "))
    const users = record.reduce( ( acc, cur ) => {
        // const infos = cur.split(" ")
        if ( cur[2] ){
            // 고유 id값 = 유저가 마지막으로 사용한 닉네임
            acc[ cur[1] ] = cur[2]
        }
        return acc
    }, {})
    
    const answer =  record.reduce( ( acc, cur ) =>{
        if( cur[0] !== "Change"){
            // Enter,Leave
           acc.push( `${ users[ cur[1] ] }님이 ` +
                ( cur[0] === "Enter" ? "들어왔습니다." : "나갔습니다." )        
            )
        }
        return acc;
    }, []);
    return answer;
} 
