// 함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. 
// 다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.


function solution(x,n){
	for(let i = 1; i <= n ; i++){			/// i 값을 1로!!!!
	answer.push(x*i)  
	}
  return answer
}

let element=0
var answer = [];

// 다른 코드
/*
function solution(x, n) {
    return Array(n).fill(x).map((v, i) => (i + 1) * v)
}
*/

// 배열 메소드 이용해서 계산 (map() 메소드)
function solution(x,n){
	const answer = new Array(n)						// n만큼 빈 새로운 배열을 만든다, 실존하는 데이터가 있어야 map을 돌릴수 있기 때문에 배열을 채워주자!
					.fill(1)						// 1이 n만큼 채워졌기 때문에 map() 사용 가능,
					.map( ( el,idx ) => {			// 받아오고 싶은 매개변수를 받아오기 + index 받아오기 (1~n까지 받아오기)
							return (el + i) *x 		// map에는 return 필요
					})
	return answer		
}