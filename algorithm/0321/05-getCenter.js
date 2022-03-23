// 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.


function solution(s) {
    if(s.length % 2 === 0){                         // 짝수인 경우
      answer = [s[s.length/2-1],s[(s.length/2)]]
      return answer.join("")
    }
    else if(s.length % 2 === 1){
      return answer = s[Math.floor(s.length/2)]     // 홀수인 경우 소수점을 제거한 n번째 인덱스가 가운데
    }  
      return answer;
  }

  solution('abcde') //'c'
  solution('qwer')// 'we'
  
  // 다른 사람 풀이
  /*
  function solution(s) {
    return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}
  */

 /*
 function solution(s) {
    const mid = Math.floor(s.length/2);
    return s.length %2 === 1 ? s[mid] : s[mid-1]+s[mid];
}
  */

function solution(s){
  const center = Math.floor(s.length / 2)
  return s.length %2 ===1
  // 홀수 문자열이라면
  ? s[center]
  // 짝수 문자열이라면
  : s.slice(center -1, center +1)
}