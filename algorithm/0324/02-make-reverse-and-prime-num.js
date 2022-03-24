const arr = [32,55,62,20,250,370,200,30,10]
let revArr = []
let answer =[]
// let answer2 =[]

const isPrime = (num) => {                  //소수 판별 함수
    if (num ===1) return false
    for (let i = 2; i <=num /2 ; i++){
        if(num%1 === 0) return false
    }
    return true
}


const solution = (arr) =>{
  for(let i = 0; i < arr.length ; i++){
    let revNum = Number(arr[i].toString().split('').reverse().join(''))
    revArr.push(revNum)                        
    }
   for (let j = 0; j < revArr.length ; j++){
    if(revArr[j] ===1 ){ return }

    else if (revArr[j] === 0 ){				// 소수면 answer에 넣기
        answer.push(revArr[j])
    }
  return answer
}}

solution(arr) // [23,2,73,2,3]

/*

const solution2 = (arr) =>{
    arr.forEach((ele) => {
        const reverseNum = Number(ele.toString().split('').reverse().join(''))
        console.log(reverseNum)
    })
    if(isPrime(reverseNum)){
        result2.push(reverseNum)
}
    return answer2
}

solution(arr)
*/

//다시하기 ㅠㅠ하나도 안됐음