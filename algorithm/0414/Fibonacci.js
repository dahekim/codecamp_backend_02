// 피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.
// 2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, solution을 완성해 주세요.




// 돌릴 때마다 나누면 속도 나오고 통과
// 마지막에 1234567 나누면 속도 안나온당, 너무 커서 safeInteger가 아니라 실패~
function solution(n) {
    // 피보나치 수열을 저장하는 배열
    // 0,1을 초기값으로 설정
    let answer = [0,1]
    
    for (let i = 2 ; i <=n ; i++){
        answer[i] = (answer[i-1] +answer[i-2] ) % 1234567
    }
    return answer[n]
    // return answer[n] % 1234567
    // 이건 안됨 ㅎㅎ
}

// reduce() 사용해서 풀이
function solution(n) {
    let prev = 0 // 0번째 피보나치 수의 결과
    let next = 1 // 1번째 피보나치 수의 결과
    let sum = prev+next // 2번째 피보나치 수의 결과
    
    const answer = new Array(n-1).fill(1).reduce( cur => {
        sum = (prev + cur) % 1234567
        prev = cur
        next = sum
        
        return sum 
    },sum)
    return answer
}