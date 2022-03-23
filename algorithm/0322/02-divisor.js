function solution(n){
    let sum = 0
    for(let i = 0; i<=n; i++){
      if(n % i === 0 ){
        sum = sum+i
      }
    }
    return sum
  }


//다른 사람 풀이 (근데 뭔솔? / 삼항연산자)
/*
function solution(n, a=0, b=0) {
    return n<=a/2?b:solution(n,a+1,b+=n%a?0:a);
}
*/

function solution(n){
  let answer = 0
  for( let i = 1 ;  i<=n ; i++ ){
    if(n % i === 0 ){
      answer += i
    }
  }
  return answer
}

function solution(n){
  let answer = n

  for( let i = 1 ;  i<= n / 2 ; i++ ){
    // 약수
    // n을 2로 나눴을 때...? n이 3000 이하니까 1500까지만 돌 수도 있다고...?
    if(n % i === 0 ){
      answer += i
    }
  }
  return answer
}

function solution(n){
  const answer = new Array(n)
                      .fill(1)
                      .reduce( (acc ,cur, i) =>{
                                            return n%(cur + i) === 0
                                              ? acc + (cur + i)       //약수라면 
                                              : acc                   //그냥 넘겨줌
                                             } ,0)
  
  return answer
}
