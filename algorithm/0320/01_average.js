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