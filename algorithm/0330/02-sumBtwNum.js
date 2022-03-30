// 두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
// 예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

function solution(a, b) {
  let answer = 0;

  if (a === b) {
    return a; //return b
  } else {
    // 제일 작은 값
    // a가 b보다 크면 b는 작은 값
    const min = Math.min(a, b); //const min = a > b ? b : a;

    // 제일 큰 값
    //a가 b보다 크면 a는 큰 값
    const max = Math.max(a, b); //const max = a > b ? a : b;

    for (let i = min; i <= max; i++) {
      answer += i;
    }
    return answer;
  }
}

// reduce()를 이용한 풀이
function solution(a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  const answer = new Array(max - min).fill(1).reduce((acc, cur, i) => {
    const num = min + cur + i;
    return acc + num;
  }, min);
  return answer;
}
