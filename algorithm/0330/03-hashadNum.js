// 양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다.
// 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다.

// 자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.

function solution(x) {
  let sum = 0;
  x = String(x); //x.toString(x)

  for (let i = 0; i < x.length; i++) {
    sum += Number(x[i]);
  }
  return x % sum === 0;
}

// reduce() 사용한 풀이
function solution(x) {
  const sum = x
    .toString() //Sting(x)
    .split("")
    .reduce((acc, cur) => {
      return acc + Number(cur);
    }, 0); // 초기값을 부여하느냐 마느냐에 따라서 타입이 변경됨, 초기값 부여 안하면 acc에도 Number()
  return x % sum === 0;
}
