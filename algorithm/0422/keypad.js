// 프로그래머스 https://programmers.co.kr/learn/courses/30/lessons/67256

const leftNumbers = [ 1,4,7 ]      // 왼쪽 키패드에 해당하는 숫자
const rightNumbers = [ 3,6,9 ]     // 오른쪽 키패드에 해당하는 숫자

function solution(numbers, hand) {
    let answer=""
    
    // 현재 두 엄지 손가락이 어떤 위치에 있는지
    const current ={
        left : 10 ,
        right : 12
    }
    for (let i = 0; i< numbers.length; i++){
        // 누를 번호가 왼쪽 키패드에 해당된다면(왼쪽 손가락으로 누른다면)
        if( leftNumbers.includes(numbers[i]) ){
            answer += "L"
            current["left"] = numbers[i] // 왼쪽 손가락으로 위치 변경
            
        // 누를 번호가 오른쪽 키패드에 해당된다면(오른쪽 손가락으로 누른다면)
        } else if ( rightNumbers.includes(numbers[i])){
            answer+="R"
            current["right"]=numbers[i] // 오른쪽 손가락으로 위치 변경
        
        // 가운데 키패드에 해당할 경우
        } else { 
            const locationObj = { ...current } // 왼쪽, 오른쪽 손가락의 위치 거리를 저장
            
            for( let hand in locationObj ){
                // 0을 눌렀을 때 예외 처리 = 0은 11 위치 값으로 처리한다
                numbers[i] = numbers[i] === 0 ? 11 : numbers[i]
                
                // 왼쪽과 오른쪽 엄지 손가락으로부터 거리값을 구한다
                let location = Math.abs( numbers[i] - locationObj[hand] )
                
                // 거리 차이가 3칸 이상일 때는 위아래로 이동 가능
                if(location >= 3){
                    location = Math.trunc(location / 3 + location % 3)
                }
                locationObj[ hand ] = location
            } 
            // 왼쪽 오른쪽 손가락 위치가 서로 동일할 경우
            // 주로 사용하는 손(매개변수 hand)으로 누른다
            if( locationObj["left"]===locationObj["right"] ){
                answer += hand === "left" ? "L" : "R"
                current [ hand ] = numbers[i]
            } else {
                if( locationObj["left"] >locationObj["right"] ){
                    // 오른손이 더 가까운 경우
                    answer += "R"
                    current["right"] = numbers[i]
                } else {
                    // 왼손이 더 가까운 경우
                    answer += "L"
                    current["left"] = numbers[i]
                }
            }
        }
    }
    return answer
}

// reduce(), Object.entries(), 비구조할당을 사용한 풀이 
const [ leftNumbers,rightNumbers ] =[ [ 1,4,7 ], [ 3,6,9 ] ] 

function solution(numbers, hand) {
    // 현재 두 엄지 손가락이 어떤 위치에 있는지
    const current ={
        left : 10 ,
        right : 12
    }
    return numbers.reduce( (acc,cur) => {
        // useFinger : 어떤 손가락으로 눌렀는지 최종 리턴값("L", "R")
        // target : 왼손인지 오른손인지 ("left", "right")
        // number : 최종적으로 누른 번호 키패드 (숫자, 0~9)
        let [ useFinger, target, number] =  ["" , "" , 0 ]
        
        if (leftNumbers.includes( cur ) ){
            [useFinger, target, number] = ["L", "left", cur]
        } else if ( rightNumbers.includes(cur) ) {
            [useFinger, target, number] = ["R", "right", cur]
        } else {
            const locationObj = Object.entries( current ).reduce( ( acc2, cur2) => {
                const targetHand = cur2[0]
                
                cur = cur === 0 ? 11 : cur
                let location = Math.abs(cur - cur2[1])
                
                if ( location >2 ) { //location >=3
                    location = Math.trunc(location / 3 + location %3)
                }
                acc2[ targetHand ] = location
                return acc2
            }, {})
            if ( locationObj["left"] === locationObj["right"] ){
                [useFinger, target, number ] = [
                    hand === "left" ? "L" : "R",
                    hand === "left" ? hand : "right",
                    cur
                ]
            } else if ( locationObj["left"] > locationObj["right"] ){
                [useFinger, target, number ] = [ "R", "right", cur ]
            } else {
                [useFinger, target, number ] = [ "L", "left", cur ]
            }
        }
        current[target] = number
				// console.log( cur, current, useFinger )
        return acc + useFinger
    }, "")
}