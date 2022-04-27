// 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.
// 또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 
// 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

// 먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 
// 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 
// 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

// 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
// 작업 진도는 100 미만의 자연수입니다.
// 작업 속도는 100 이하의 자연수입니다.
// 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다.
// 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

// 풀다 만 코드~ㅠㅠ
function solution(progresses, speeds) {
    let answer = []
    let day = []
    let count = 0
    let temp = 0

    
    for(let i = 0 ;i < progresses.length ; i++){
        day[i] = Math.ceil((100-progresses[i]) / speeds[i])
    }
    
    for(let i = 0 ; i < day.length ; i++){
        if(day[i]>day[i+1]) {
            count++
            answer.push(count)
            temp = day[i]
						if(temp>day[i])
        }
    }
    
    return answer 
}

// 멘토님 코드ㅠ_ㅠ
function solution(progresses, speeds) {
    const answer=[]
    let day = 0
    
    for (let i = 0 ; i < progresses.length ; i++){
        // 100% 완성까지 며칠이 걸리는지
        const process = Math.ceil( (100 - progresses[i]) / speeds[i])
        if ( process > day ) {
            day = process
            answer[ answer.length ] = 1
        } else if( day >= process ){
            //  개발이 완료됐지만 앞에있는 기능이 완성될 때까지 기다리는 경우
            answer[answer.length -1]++
        }
    }
    return answer
}

// reduce() 사용한 풀이
function solution(progresses, speeds) {
    let day = 0
    const answer = progresses.reduce( ( acc, cur ,i  ) => {
        const process = Math.ceil( (100 - cur) /  speeds[i] )
        
        if( process > day ) {
            day = process
            acc[acc.length] = 1
        } else if(day>= process){
            acc[acc.length -1]++
        }
        return acc
    }, [])
    return answer
}