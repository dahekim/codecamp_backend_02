// 대문자와 소문자가 섞여있는 문자열 s가 주어집니다. s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요. 
// 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 
// 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.

// 예를 들어 s가 "pPoooyY"면 true를 return하고 "Pyy"라면 false를 return합니다.

// 문자열 s의 길이 : 50 이하의 자연수
// 문자열 s는 알파벳으로만 이루어져 있습니다
let s = "pPoooyY"
solution(s)

/*
function solution(s){
    var text = s.toLowerCase()
    let answer =true
    
    let countP = 0
    let countY = 0

    text.forEach(ele => {
    if(ele === p) countP++
    else if (ele === y) countY++ 

    for (let i = 0; i < text.length ; i++){
        if (countP !== countY){ return false}
        // p,y 가 둘다 없다면 false

        else if(ele !== p && ele !== y) { return false } 
        // p,y 의 갯수가 다르다면
    }
    return answer
}
*/

//멘토님 기본코드
function solution(s){
    var answer = true;

    let p = 0       // p의 갯수를 담음
    let y = 0       // y의 갯수를 담음
    
    for (let i = 0 ; i <s.length ; i ++){
        if(s[i] === "p" || s[i] === "P"){
            p++
        }
        else if (s[i] === "y" || s[i] === "Y"){
            y++
        }
        
    }
    
    if (p !== y){
        answer = false
    }
    console.log('Hello Javascript')

    return answer;
}


//리팩토링

function solution(s){
    s = s.toLowerCase()
    //전체 문자열을 소문자로 변경

    let p = 0       // p의 갯수를 담음
    let y = 0       // y의 갯수를 담음
    
    for (let i = 0 ; i <s.length ; i ++){
        if( s[i] === "p" ){
            p++
        }
        else if ( s[i] === "y" ){
            y++
        }
        
    }
    
    return p === y
}

// 어떤 데이터가 오든 데이터를 동적으로 만들거나 할당 가능
// 객체를 이용한 풀이 
function solution(s){
    const check ={}     // s가 가져오는 객체를 check에 저장
    // 전체 문자를 소문자로 변경
    s.toLowerCase().split('').forEach( str => {     // str로 s에 담긴 글자 하나하나 다 가져옴
        check [ str ] === undefined         
        // 객체에 할당되어 있는 키 데이터가 없다면
        ? check [str] = 1   // 키 값이 없다면(문자가 없다면) 키를 만들고 1을 초기값으로~
        : check [str] ++    // 키값 있으면 1씩 추가
    })
    return check.p === check.y
    }    
