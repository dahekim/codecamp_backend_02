// 정수 배열 numbers가 주어집니다. 
// numbers에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를 배열에 오름차순으로 담아 return 하도록 solution 함수를 완성해주세요.

function solution(numbers){
    const answer =[]

    // 반복문으로 요소 데이터 가져오기
    for (let i = 0 ; i < numbers.length ; i++) {
        for (let j = i +1 ; j <numbers.length ; j++ ){
            const sum = numbers[i] + numbers[j]

            // 기존의 배열에 이미 있는 데이터인지를 체크한다
            // 이미 있다면 넣어주지 않는다!
            // includes()를 이용한 체크~
            if( !answer.includes(sum) ){           // answer.includes(sum) === false 
            answer.push(sum) }
        }
    }
    return answer.sort( (a,b) => a-b )
}

// new Set()을 사용한 풀이
function solution(numbers){
    const answer = new Set([])                  //초기 값으로 빈 배열

    // 반복문으로 요소 데이터 가져오기
    for (let i = 0 ; i < numbers.length ; i++) {
        for (let j = i +1 ; j <numbers.length ; j++ ){
            const sum = numbers[i] + numbers[j]
            answer.add(sum) }
        }
    return Array.from(answer).sort( (a,b) => a-b )        //return [...answer]
}

// ForEach를 사용한 풀이
function solution(numbers) {
    const answer = new Set( [] )

    numbers.forEach( (num1, i) => {
        numbers.slice( i + 1 ).forEach( num2 => {
            const sum = num1 + num2

            answer.add(sum)
        })
    })
    return [...answer].sort( (a,b) => a-b )
}