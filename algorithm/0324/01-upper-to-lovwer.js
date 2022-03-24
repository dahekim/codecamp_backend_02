list = ["cODECAMP", "iS", "tHIS", "eVERYONE", "hELLO"]

let revStr = []
revStr = list.reverse() 


let answer = ''

function solution(revStr){
  for(let i = 0 ; i <= revStr.length ; i++ ){
    for(let j = 0 ; j<revStr[j].length ; j++){
      let case = revStr[i].charCodeAt(j)
      if ( case >= 65 && case <=90 )
      {
          letter = case + 32
          answer += 
      }
      else 
      {
          letter = case - 32
          answer += 
      }
    }
  }
  answer.join(" ")
}

solution(revStr)

// 다시하기 ㅠㅠ 하나도 안됨 
