// 입력되는 수에 따라 0부터 해당 수까지의 합을 구하려고 합니다.
// num은 1이상의 자연수가 들어옵니다.
// 만약 num이 5라면 1 + 2 + 3 + 4 + 5를 모두 더한 값을 출력시켜주세요.

//for을 이용해서 문제 풀기

function sum(num){
    let count = 0     // 1~num까지의 숫자
/*    
    for(let i = 0; i <=num ; i++)
    count = count +i
*/

  for(let i = 1; i<=num ; i++){
    count += i
  }
return count
//    console.log(count)    
}

sum(5)     //15
sum(2)      //3