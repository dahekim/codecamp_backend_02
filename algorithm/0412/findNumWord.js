// 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다. 
// s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

// 1 ≤ s의 길이 ≤ 50
// s가 "zero" 또는 "0"으로 시작하는 경우는 주어지지 않습니다.
// return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 s로 주어집니다.


// replace() 사용 풀이
const numbers = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ]

function solution(s) {
    for (let i = 0; i <numbers.length ; i++){
        // 전체 문자열에 동일 단어가 없을 때까지 반복문을 돌린다.
        while ( s.includes(numbers[i] ) )
            s = s.replace(numbers[i], i) 
        // console.log(s, numbers[i] )
        // console.log(s)
    }
    return Number(s)
}

// 단순 반복 용도로의 forEach() 사용한 풀이
// replaceAll()과 동일한 결과 ( s.split(str).join(i) )

function solution(s) {
    numbers.forEach( (str, i) =>{
        // console.log(str)
        // 전체 문자열을 배열, 하나의 문자열로 가져오는데 
        // 포함되는 단어가 있다면 빈 문자열을 받아오고 빈 문자열을 기준으로 그 뒤로 잘린 배열이 들어온다.
        s = s.split(str).join(i)
        // console.log( s,str,i )
    })
    return Number(s)
}

// 정규 표현식을 사용한 풀이
// 근데 너무 
function solution(s){
    // 전체 문자열에서 zero만 찾아서 0으로 변경
    s = s.replace( /zero/g, 0 )
    s = s.replace( /one/g, 1 )
    s = s.replace( /two/g, 2 )
    s = s.replace( /three/g, 3 )
    s = s.replace( /four/g, 4 )
    s = s.replace( /five/g, 5 )
    s = s.replace( /six/g, 6 )
    s = s.replace( /seven/g, 7 )
    s = s.replace( /eight/g, 8 )
    s = s.replace( /nine/g, 9 )
    
    return Number(s)
}

// 동적으로 변수를 할당하고 싶은데 어떻게 해?
// 위에서 만들어 둔 배열 numbers 사용

function solution(s){
    for (let i = 0 ; i <numbers.length; i++){
        // 사용하고 싶은 변수, 옵션값 (전역변수로 해줘~)
        const regExp = new RegExp(numbers[i] , "g")
        //console.log(regExp)
        // /zero/g
        // /one/g
        // /two/g
        // /three/g
        // /four/g
        // /five/g
        // /six/g
        // /seven/g
        // /eight/g
        // /nine/g
        
        s = s.replace(regExp,i)
    } 
    return Number(s)
}