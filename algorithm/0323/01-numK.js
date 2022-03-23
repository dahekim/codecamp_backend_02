// 배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.
// array의 길이는 1 이상 100 이하입니다. array의 각 원소는 1 이상 100 이하입니다.
// commands의 길이는 1 이상 50 이하입니다. commands의 각 원소는 길이가 3입니다.

let array = [1,5,2,6,3,7,4]
let commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]]

var answer = []

function solution(array,commands){
  for (let i = 0 ; i < commands.length ; i++){
      const x = commands[i][0]
      const y = commands[i][1]
      const z = commands[i][2]
    array.slice(x-1,y)
    arrSlice.sort()
    let result = arrAsc[z-1]
    answer.push(result)
  }
return answer
} 

//ㅠㅠ안됨 [null, null, null] 뜬다...

function solution(array, commands) {
    const answer = []
    for (let idx = 0; idx < commands.length; idx ++){
        const i = commands[idx][0]
        const j = commands[idx][1]
        const k = commands[idx][2]
        
        const result = array.slice(i-1,j).sort( (a,b) => {
            return a-b
        })
        answer.push( result[k-1] )
    }  
    return answer;
}

//리팩토링(map 사용)
function solution (array,commands){
    const answer = commands.map( arr => {
        const result = array.slice( arr[0] -1 , arr[1] )
        .sort( (a,b) =>{
            return a-b
        })
        return result [arr[2]-1]
    })
    return answer
}

// 고친 코드ㅠㅠ 이게

let answer = []
function solution(array,commands){
    for (let i = 0 ; i < commands.length ; i++){
        const x = commands[i][0]
        const y = commands[i][1]
        const z = commands[i][2]
        
        let result = array.slice(x-1,y).sort()
        result = result[z-1]
        answer.push(result)
    }
  return answer
  } 
  
