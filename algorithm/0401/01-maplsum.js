// 어떤 정수들이 있습니다. 이 정수들의 절댓값을 차례대로 담은 정수 배열 absolutes와 이 정수들의 부호를 차례대로 담은 불리언 배열 signs가 매개변수로 주어집니다.
// 실제 정수들의 합을 구하여 return 하도록 solution 함수를 완성해주세요.

// 내 코드... 안됨... 왜지...
function solution(absolutes, signs) {
  let answer = 0;
  for (let i = 0; i < signs.length; i++) {
    if (signs[i] === false) {
      answer = answer - absolutes[i];
    } else {
      answer += absolutes[i];
    }
    return answer;
  }
}

// 멘토님 코드
function solution(absolutes, signs) {
  let answer = 0;
  for (let i = 0; i < signs.length; i++) {
    answer += signs[i] ? absolutes[i] : -absolutes[i]; // 음수로 변경됨
  }
  return answer;
}

// reduce() 메소드 사용

function solution(absolutes, signs) {
  const answer = absolutes.reduce((acc, cur, i) => {
    return acc + (signs[i] > 0 ? cur : -cur);
  }, 0);
  return answer;
}
