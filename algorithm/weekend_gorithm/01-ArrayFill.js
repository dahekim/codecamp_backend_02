// 핸드폰 번호가 담긴 문자열 phone이 주어질 때, 뒤의 4자리를 "*"로 바꿔서 리턴해주세요.
// Replit day1
function solution(phone) {
  return phone.split("").fill("*", 7).join(""); // split() 사용해서 배열로 변환 - > fill() 사용해서 7번째 인덱스부터 마지막까지 "*"로 변환 -> join() 사용해서 배열을 문자열로 변환
}

solution("01012345678"); // "0101234****"
