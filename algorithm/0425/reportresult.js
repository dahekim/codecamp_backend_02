// 각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
// 신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
// 한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
// k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.
// 유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.
// 다음은 전체 유저 목록이 ["muzi", "frodo", "apeach", "neo"]이고,
//  k = 2(즉, 2번 이상 신고당하면 이용 정지)인 경우의 예시입니다.

// 이용자의 ID가 담긴 문자열 배열 id_list, 각 이용자가 신고한 이용자의 ID 정보가 담긴 문자열 배열 report, 
// 정지 기준이 되는 신고 횟수 k가 매개변수로 주어질 때, 
// 각 유저별로 처리 결과 메일을 받은 횟수를 배열에 담아 return 하도록 solution 함수를 완성해주세요.

function solution(id_list, report, k) {
    let users = {}          // 신고당한 사람이 몇번 신고를 당했는지 저장
    let reporter = {}       // 신고한 사람이 누구를 신고했는지 저장

    report = Array.from( new Set(report) )
    report.forEach(el => {
        const info = el.split(" ")
        if( users [ info[1] ] === undefined )
            users [ info[1] ] = 0
        if( reporter[ info[0] ] === undefined )
            reporter[ info[0] ] = []
        
        users[info[1]]++
        reporter[info[0]].push(info[1])
        
    })  
    return id_list.map( name => {
        const arr = reporter[ name ] || []
        return arr.reduce( (acc,cur) => {
            return acc + ( users[cur] >= k ? 1 : 0)
        }, 0)
    })
}
