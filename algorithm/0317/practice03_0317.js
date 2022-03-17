// num을 입력받아 1부터 num의 값까지 각각의 숫자 사이에 "-"이 들어간 문자열을 만들어야 합니다.
// num이 3일 경우에는 "1-2-3"입니다.

// num은 숫자열입니다.
// for을 이용해서 문제를 풀어야 합니다.


function makeNumber(num){
  let str ='';
  let count = 0
  
  for(let i = 1; i <=num; i++){
    if(i<num){
      count=i
    str += count+'-'
    }
    else if (i=num){
      str += count+1
      console.log(str)
    }    
  }
}

makeNumber(5)     // 1-2-3-4-5