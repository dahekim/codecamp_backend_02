// 실패율을 구하는 코드를 완성하라.
// 실패율은 다음과 같이 정의한다.
// 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
//전체 스테이지의 개수 N, 게임을 이용하는 사용자가 현재 멈춰있는 스테이지의 번호가 담긴 배열 
// stages가 매개변수로 주어질 때, 실패율이 높은 스테이지부터 내림차순으로 
// 스테이지의 번호가 담겨있는 배열을 return 하도록 solution 함수를 완성하라.

function solution(N, stages) {
    // 모든 스테이지의 번호를 오름차순으로 정렬
    stages.sort( ( a,b )=> a-b )
    
    const infos = []
    for (let i = 1; i <= N; i++){
        infos.push({
            stage: i,       // 현재 스테이지의 번호
            users : 0,      // 클리어하지 못한(플레이 중인) 유저의 수
            fail: 0         // 스테이지의 실패율을 저장
        })
    }
    //console.log(infos)
    let allUsers = stages.length; // 모든 유저의 수(초기값)
    for (let i = 0; i <stages.length ; i++){
        if( infos[ stages[i]-1 ]   ){
            infos[ stages[i]-1].users++
            // console.log(infos,stages[i])
            
            // 현재 스테이지의 번호와 다음 스테이지의 번호가 동일하지 않다면
            // === 현재 스테이지의 유저의 합산이 완료되는 시점
            
            if( stages[i] !== stages[i+1] ){
                const fail = infos[ stages[i] -1 ].users / allUsers
                allUsers -= infos [ stages[i] -1].users
                
                infos[ stages[i]-1 ].fail = fail
            }
        }
    }
    return infos.sort((a,b) =>{
        return b.fail -a.fail
    }).map(el=> el.stage)
}

// map()을 이용한 풀이
function solution(N, stages) {
    stages.sort( ( a,b ) => a-b )
    
    let allUsers = stages.length
    const answer = new Array(N).fill(1).map((num,i) =>{
        const stage = num + i
        const arr = stages.slice(
            stages.indexOf( stage ),
            stages.lastIndexOf(stage)+1
        )
        const fail = arr.length / allUsers
        allUsers -=arr.length
        
        return {stage, fail}
    }).sort((a,b) => {
        return b.fail - a.fail
    }).map(el => el.stage)
    return answer
}