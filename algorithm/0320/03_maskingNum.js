function solution(phone_number) {
    const maskingNum = []
      for (let i = 0; i<phone_number.length-4; i++){
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