//문자열 s의 길이가 4 혹은 6이고, 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요. 예를 들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.

function solution(s) {
    return (!Number.isNaN(+s) && s.length === 4) 
    || s.length === 6 ? true : false;
  }

  
// 0으로 이뤄진 문자열일 경우 테스트케이스 11에서 오류 날 수 있음
// 고쳐야함


// 다 안 걸리는 코드...

function solution(s){
  if (s.length !==4 && s.length !== 6){       
      return false
  }
  // 예외처리(문자열의 길이가 4나 6이 아닌 경우)
  for (let i = 0 ; i<s.length; i++){
      if (isNaN(s[i]) === true){
          // 문자가 하나라도 있는 상황
          return false
      }
  }
  // 나머지~ ^^ 
  return true
}



function solution(s){
  if (s.length !==4 && s.length !== 6){       
      return false
  }    
  const answer = s.split('').filter( num => {
      // 문자가 맞는 데이터만 남긴다.
      return isNaN( num )
  })
  // 배열이 비어있는지(문자열이 하나라도 존재하는지)를 판단해서
  // 배열이 비어있지 않다면 false, 비어있다면 true
  return answer.length === 0
}