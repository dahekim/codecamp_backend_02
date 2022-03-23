function arrAverage(arr) {
    var answer = arr.reduce((p,c) => p+c ,0)/arr.length
  return answer;
}

 const arr = [1,2,3,4]   //'2.5'
// const arr = [5,5]       // '5'
arrAverage(arr)



/*
다른 풀이

function average(array){
  return array.reduce((a, b) => a + b) / array.length;
}

*/

/*
function solution(arr){
  let sum = 0
  for (let i = 0; i <arr.length; i++){
    sum += arr[i]
  }
  //총 합에서 배열의 길이만큼 나누기
  return sum/arr.length
}
*/

function solution(arr){
  const sum = arr.reduce((acc,cur) =>{
    
  }, 0)
}