// https://programmers.co.kr/learn/courses/30/lessons/17681

function solution(n, arr1, arr2) {
    const answer = []
    
    for( let i = 0 ; i < arr1.length ; i++){
        answer[i] = ""
        
        // 지도1을 2진법으로 변환한 데이터를 저장
        const map1 = arr1[i].toString( 2 ).padStart(n, "0")
        // 지도2를 2진법으로 변환한 데이터를 저장
        const map2 = arr2[i].toString( 2 ).padStart(n, "0")
        
        for (let j = 0; j<map1.length; j++){
            // 둘 중 하나라도 벽이기 때문에 전제 지도에서도 벽
            if (map1[j] ==="1" || map2[j] === "1"){
                answer[i] +="#"
            }
            // 두 개의 지도 모두 공백이라면, 전체 지도에서도 공백
            else if (map1[j] === "0" && map2[j] ==="0"){
                answer[i] += " "
            }
        }
    }
    return answer
}


// map()과 reduce()를 사용한 풀이
function solution(n, arr1, arr2) {
    const answer = arr1.map( (map1,i) => {
        map1 = map1.toString( 2 ).padStart(n, "0")
        const map2 = arr2[i].toString( 2 ).padStart(n,"0")
        
        const result = map1.split("").reduce( (acc,cur,i) => {
            return acc += ( cur === "1" || map2[i] === "1")
            ? "#"
            : " "
        }, "")
        return result
    })
    return answer
}

