// 수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

// 1번 수포자가 찍는 방식: 1, 2, 3, 4, 5,       1, 2, 3, 4, 5, ...
// 2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5,       2, 1, 2, 3, 2, 4, 2, 5, ...
// 3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5,         3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

// 1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때,
// 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

const answerTable = [
    // 1번 수포자가 찍는 방식
    [1,2,3,4,5],                // 5
    // 2번 수포자가 찍는 방식
    [2,1,2,3,2,4,2,5],          // 8
    // 3번 수포자가 찍는 방식
    [3,3,1,1,2,2,4,4,5,5]       // 10
]

function solution(answers){
    // 각각의 학생들의 점수를 저장하는 배열
    const answer = [0,0,0]
    
    for(let i = 0; i < answers.length ;  i++){
        for (let j = 0 ; j <answerTable.length ; j++){
        // answers[i] :  정답의 데이터 
        // answer[j] : 각각의 수포자가 찍은 배열 데이터를 가져옴 
        // i % answerTable[j].length 뭐...?
            if ( answerTable[ j ][ i % answerTable[j].length ] === answer[i] ){
                answer[j]++
            } 
        }
    }

    // 가장 많이 맞춘 점수 
    const biggest = Math.max(...answer)

    // 최고점수를 가진 학생을 answer 배열에서 찾아서 result에 넣기
    const result = []

    for ( let i = 0 ; i < answer.length ; i++ ){
        if( answer[i] === biggest ){
            result.push( i + 1 )
        }
    }
    return result
}

// map() 사용
function solution(answers){
    const scoreList = answerTable.map( (el,j)  =>{
        const score = answers.reduce ((acc, cur, i) => {
            return acc + (
                el[i % el.length] === cur ? 1 : 0
            )
        }, 0)
        return {student : j + 1 ,  score: score}
    })

    const biggest = Math.max(...scoreList.map( el => {
        return el.score
    }))

    return scoreList.filter(el => {
        return el.score ===biggest 
    }).map( el => el.student )
}