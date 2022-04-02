// JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
// 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

function solution(s) {
  s = s.toLowerCase(); // 전체 문장을 소문자로 변환
  let answer = "";
  let idx = 0;

  for (let i = 0; i < s.length; i++) {
    let letter = s[i];

    if ((letter = " ")) {
      // 공백이면 idx를 초기화
      idx = 0;
    } else {
      if (idx === 0) {
        // 단어의 가장 앞부분 체크
        letter = s[i].toUpperCase();
      }
      idx++;
    }
    answer += letter;
  }
  return answer;
}

// map(), substring() 사용
function solution(s) {
  s = s
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word !== "" ? word[0].toUpperCase() + word.substring(1) : word;
    });
  return s.join(" ");
}
