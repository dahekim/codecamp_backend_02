function solution(arr)
{
    var answer = [];
  for ( let i = 0 ; i < arr.length ; i++ ){
    if(arr[i] !== arr[i+1])
      answer.push(arr[i])
  }   
    console.log('Hello Javascript')
    
    return answer;
}

//다른 사람 풀이
/*
function solution(arr)
{
    return arr.filter((val,index) => val != arr[index+1]);
}
*/