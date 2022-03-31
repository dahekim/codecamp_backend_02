// 길이가 같은 두 1차원 정수 배열 a, b가 매개변수로 주어집니다. a와 b의 내적을 return 하도록 solution 함수를 완성해주세요.
// 이때, a와 b의 내적은 a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1] 입니다. (n은 a, b의 길이)

// a, b의 길이는 1 이상 1,000 이하입니다.
// a, b의 모든 수는 -1,000 이상 1,000 이하입니다.

a = [1, 2, 3, 4];
b = [-3, -1, 0, 2];

solution(a, b); // 3

function solution(a, b) {
  let answer = 0;
  // a 또는 b의 각각의 요소 데이터 가져오기
  // 길이가 같으므로 하나의 for문에서 같은 인덱스 값으로 접근이 가능
  for (let i = 0; i < a.length; i++) {
    const sum = a[i] * b[i];
    answer += sum;
  }
  return answer;
}

// reduce() 사용

function solution(a, b) {
  const answer = a.reduce((acc, cur, i) => {
    return acc + cur * b[i];
  }, 0);
  return answer;
}
