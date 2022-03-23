// 자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.
// N의 범위 : 100,000,000 이하의 자연수

function solution(n)
{
  const arr = String(n)
  let answer = 0
  for (let i = 0; i<=arr.length-1; i++){
    answer = answer+Number(arr[i])
  }  
  console.log('Hello Javascript')
	return answer
}

solution(123) ///6
solution(987) //24

//다른  풀이
/*
function solution(n){
    // 쉬운방법
    return (n+"").split("").reduce((acc, curr) => acc + parseInt(curr), 0)
}
*/

/*

function solution(n)
{
    var a = (n + '').split('');
    var b = 0;
    for(var i = 0; i < a.length; ++i) {
        b += parseInt(a[i]);
    }
    return b;
    //return n.toString().split('').reduce((a, b) => (a * 1) + (b * 1));
}
*/

/*
function solution(n){
  n = String(n)

  let answer = 0
  for ( let i = 0 ; i < n.length; i++) { 
    answer +=Number(n[i])
    }
    return answer
}
*/

// 멘토님 코멘트 - reduce 이용한 연산

function solution(n){
  const answer = n.toString() //문자열 형태로 변환해줌
                  .split("")
                  .reduce((acc, cur) => {
                        return acc+cur
                  }, 0)       //초기값 0을 'acc'에 넣어준다!  / acc와 cur의 형태가 toString으로 변환되어있기 때문에 초기값을 주지 않으면 요상해짐. 초기값 안 주고 싶으면 return에 들어간 acc와 cur를 Number로 감싸주기! 
  return answer }

