// 행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다.
// 2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, solution을 완성해주세요.

// 행렬 arr1, arr2의 행과 열의 길이는 500을 넘지 않습니다

// 배열 안의 배열 => 이차원 배열(혹은 이중 배열)
// 같은 행, 열을 받았을 때 그걸 더하고 리턴되는 값을 같은 위치에 넣어서 리턴~

arr1 = [
  [1, 2],
  [2, 3],
];
arr2 = [
  [3, 4],
  [5, 6],
];
function solution(arr1, arr2) {
  const answer = [[]];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      const sum = arr1[i][j] + arr2[i][j];

      // 0번째 배열 이후의 인덱스로 접근하려고 하는데 그 배열이 없다면 (undefined)
      // 그 인덱스에 빈 배열을 만들어준다
      if (answer[i] === undefined) {
        answer[i] = [];
      }

      answer[i][j] = sum;
    }
  }
  return answer;
}

// map() 사용
function solution(arr1, arr2) {
  const answer = arr1.map((num1, i) => {
    return num1.map((num2, j) => {
      return num2 + arr2[i][j];
    });
  });
  return answer;
}
