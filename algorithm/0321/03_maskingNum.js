function solution(phone_number) {
    const maskingNum = []
      for (let i = 0; i<phone_number.length-4; i++){
        // 뒷번호 4자리를 제외한 앞자리까지는 *로 처리
      maskingNum.push("*")
    }
    for (let i = 4; i>=1 ; i--){
      maskingNum.push(phone_number[phone_number.length-i])
    }  
    
      var answer = maskingNum.join("").toString();
      return answer;
  }

  // 다른 풀이
  /*
  function hide_numbers(s) {
    return s.replace(/\d(?=\d{4})/g, "*");
  }
  */

  /*
  function hide_numbers(s){
  var result = "*".repeat(s.length - 4) + s.slice(-4);


  return result;
}
  */

/*
 function solution(phone_number){
   let answer = "";
   answer = answer.padStart(phone_number.length-4,"*")    //padStart 이용해서 phone_number.length-4 만큼의 자릿수를 "*"로 채우기
    answer += phone_number.slice( phone_number.length-4, phone_number.length )    //slice 사용해서 배열, 문자열을 자를 때 사용, 원본이 저장되지 않음
   
   return answer
 }
*/