// 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 함수, solution을 완성해주세요.

// num은 int 범위의 정수입니다.
// num은 짝수입니다.

function solution(num) {
    var answer = '';
    if (num %2 ===0){
      answer = "Even"
    }
    else{
      answer = "Odd"
    } 
      
    return answer;
  }
  
  solution(0)		//'Even'
  solution(3)		//'Odd'

//리팩토링
/*
function solution(num) {
  if (num %2 ===0){
    return "Even"
  }
  return  "Odd"
  } 
}
*/


//삼항 연산자를 이용한 다른 풀이
  /*
  function evenOrOdd(num) {
  return num % 2 ? "Odd" : "Even";
}
  */


