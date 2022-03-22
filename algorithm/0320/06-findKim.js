// String형 배열 seoul의 element중 "Kim"의 위치 x를 찾아, "김서방은 x에 있다"는 String을 반환하는 함수, solution을 완성하세요. 
// seoul에 "Kim"은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.

function solution(seoul) {
    const location = seoul.indexOf("Kim")
    let result = "김서방은 "+location+"에 있다"
    return result 
  }



  // for 문을 사용한 함수
  function solution(seoul){
    let x = 0;

    for (let i = 0 ; i <seoul.length ; i++){
      if(seoul[i] === "Kim"){
        x = i
        break         // "Kim"을 최초로 찾으면 반복문을 멈춘다!
      }
    }
    //return "김서방은 "+ x + "에 있다."
    return `김서방은 ${x}에 있다.`
  }