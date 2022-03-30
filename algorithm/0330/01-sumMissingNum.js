//0부터 9까지의 숫자 중 일부가 들어있는 정수 배열 numbers가 매개변수로 주어집니다.
// numbers에서 찾을 수 없는 0부터 9까지의 숫자를 모두 찾아 더한 수를 return 하도록 solution 함수를 완성해주세요.

function solution(numbers) {
  let answer = 0;
  let sum = 0;

  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j].includes(i) === false) {
        return (answer = sum + i);
      }
    }
  }
  return answer;
}

// for문 사용
function solution(numbers) {
  let answer = 0;
  for (let i = 1; i <= 9; i++) {
    if (numbers.includes(i) === false) {
      answer += i;
    }
  }
  return answer;
}

// reduce() 사용 (배열 필요하므로 배열 생성해서 풀이)
function solution(numbers) {
  const answer = new Array(9).fill(1).reduce((acc, cur, idx) => {
    const num = cur + idx;

    return (
      acc +
      (numbers.includes(num)
        ? // 배열에 존재한다면 0을 더한다.
          0
        : // 배열에 존재하지 않는다면 num을 더한다
          num)
    );
  }, 0);
  return answer;
}
