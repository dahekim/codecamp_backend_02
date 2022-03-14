//한번에 최대 2층을 올라가는 로봇이 1층에서 100층까지 올라간다고 할 때, 100층까지 도달할 수있는 수 중 최소 횟수를 구하는 알고리즘은
/*
let maxStep =2;
let stairs = 100;

let minMove = stairs / maxStep
console.log (minMove)
*/
//내가 짠 알고리즘

/*
let answer = 0;
const stairs = 100;

for(let i = 1; i<stairs; i=o+2)
  {
    answer = anwseranswer1;
  }
*/
// for문에 기반해서 짜여진 코드 


const stairs= 100;
const minMove = Math.floor(stairs/2)
//최종 최적화된 코드

