// 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하는 함수, solution을 완성해 보세요. 
// 배열의 맨 앞에 최대공약수, 그다음 최소공배수를 넣어 반환하면 됩니다. 

// 예를 들어 두 수 3, 12의 최대공약수는 3, 최소공배수는 12이므로 solution(3, 12)는 [3, 12]를 반환해야 합니다.

function solution(n,m){
    // 최대공약수: 두 수의 공통된 약수 중에서 제일 큰 수 
    // 최소공배수: 두 수의 공통된 배수 중에서 제일 작은 수
    


    let max = 0
    let min = 0
    let bigNum = Math.max(n,m)
    let smallNum = Math.min(n,m)

    // 최대공약수 구하기
    // 반복문 사용 
    // >  숫자 1부터 n,m 에서 제일 큰 값을 가져와서 가져온 숫자들을 두개로 나눴을때 나눠지는지 확인

    for( let i = 1 ; i <= bigNum ; i++ ){
        if (n % i === 0 && m % i === 0){
            max = i
        }
    }
    // 최소공배수 구하기
    for ( let i = bigNum ; i<= n * m ; i+=bigNum  ){
        if ( i % smallNum ===0 ){
            min = i                 // 최초로 뽑아오는 값만 뽑아오고 break
            break
        }
    }   

    return [max, min]
}
// 유클리드 호제법
// 최대공약수를 구할 수 있는 공식
// 최대공약수를 구하기 위한 알고리즘 (=공식)

// a를 b로 나눴을 때(a가 b보다 클 경우) === 큰수에서 작은 수를 나눴을 때
// 나머지 값이 0이 되면, 작은 수(b)가 최대공약수
// 나머지 값이 0이 아니라면, 작은 수(b)가 큰 수(a)가 된다.
// 나머지 값은 작은 수(b)가 된다.
// 나머지 값이 나올 때까지 위의 과정을 반복

function solution2(n,m){
    let a = Math.max(n,m)           // 큰 수
    let b = Math.min(n,m)           // 작은 수
    let r = 0                       // a를 b로 나눴을 때 나머지 값을 저장

    while ( a % b  > 0 ) {
        r = a % b
        a = b           // 큰 수에 작은 수를 할당
        b = r           // 작은 수에 나머지 값을 할당
    }

    // 최소공배수는 두 수를 곱한 값에 최대공약수를 나눈 값
    return [ b, ( n*m ) / b]

}

