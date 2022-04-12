// forEach 사용

function solution(nums) {
    let answer = 0
    let idx = 0
    
    // 첫 번째 숫자 =  num1
    nums.forEach( (num1, i) => {
        idx = i + 1
        // 두 번째 숫자 = num2
        nums.slice( idx ).forEach( num2 =>{
            idx++
            // 세 번째 숫자 = num3
            nums.slice( idx ).forEach(num3 =>{
                const sum = num1+num2+num3
                
                let count = 0
                if (sum%2 === 1) {
                    for(let k = 1; k <=sum ; k++) {
                        if( sum%k === 0 ) count++
                        if( count  > 2 ) break
                    }
                }
                if ( count === 2 ) answer++
            })
        })
    })
    return answer
}