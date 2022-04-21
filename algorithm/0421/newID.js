// 새로 가입하는 유저들이 아이디 규칙에 맞지 않는 아이디를 입력했을 때, 
// 입력된 아이디와 유사하면서 규칙에 맞는 아이디를 추천해주는 프로그램을 개발해야 한다.
// 다음은 아이디의 규칙입니다.

// 아이디의 길이는 3자 이상 15자 이하여야 합니다.
// 아이디는 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.) 문자만 사용할 수 있습니다.
// 단, 마침표(.)는 처음과 끝에 사용할 수 없으며 또한 연속으로 사용할 수 없습니다.

/*
1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
    만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 
    반복해서 끝에 붙입니다.
*/

// 신규 유저가 입력한 아이디를 나타내는 new_id가 매개변수로 주어질 때, 
// 설계한 7단계의 처리 과정을 거친 후의 추천 아이디를 return 하도록 solution 함수를 완성해 주세요.


// new_id는 길이 1 이상 1,000 이하인 문자열입니다.
// new_id는 알파벳 대문자, 알파벳 소문자, 숫자, 특수문자로 구성되어 있습니다.
// new_id에 나타날 수 있는 특수문자는 -_.~!@#$%^&*()=+[{]}:?,<>/ 로 한정됩니다.

const filter = 'qwertyuiopasdfghjklzxcvbnm1234567890-_.';
function solution(new_id) {
    // 1. 모든 대문자를 소문자로 치환 
    new_id = new_id.toLowerCase()
    // 2. 알파펫 소문자, 숫자, -, _, . 을 제외한 나머지 모든 문자를 제거
    let answer = ""
    for( let i = 0; i <new_id.length ; i++ ){
        if( filter.includes( new_id[i] ) ) {
            answer += new_id[i]
        }
    }
    
    // 3. 마침표(.)가 두 번 이상 연속된다면 하나의 마침표로 치환
    while( answer.includes("..") ){
        answer = answer.replace("..",".")
    }
    
    // 4. 마침표(.)가 처음이나 끝에 위치한다면 제거
    if ( answer[0] === "." ){
        answer = answer.substring( 1 )
    }
    function removeLastdot() {
        if ( answer[answer.length-1] === "." ){
            answer = answer.substring( 0, answer.length-1 )
        }
    }
    removeLastdot()
    
    // 5. 빈 문자열이면 소문자 a 대입
    if( answer.length === 0 ) { //if(answer==="")
        answer = "a"
    }
    
    // 6. 길이가 16자 이상이면 첫 15개를 제외한 나머지 문자를 모두 제거,
    // 제거 후 아이디 끝에 .이 있다면 마침표(.)를 제거
    if( answer.length >= 16 ){
        answer = answer.substring( 0, 15 )
        removeLastdot()
    }
    
    
    // 7. 길이가 2자 이하면 길이가 3이 될 때 까지 아이디의 마지막 문자를 반복
    if ( answer.length <= 2 ) {
        answer = answer.padEnd( 3, answer[ answer.length -1 ] )
    }
    return answer
}

// 배열과 filter(), slice(), padEnd(), concat()을 사용한 풀이



function solution(new_id) {
    // 1. 모든 대문자를 소문자로 치환 
    new_id = new_id.toLowerCase().split("")
    // 2. 알파펫 소문자, 숫자, -, _, . 을 제외한 나머지 모든 문자를 제거
    let answer = new_id.filter( str => {
        return filter.includes( str )
    })
    
    // 3. 마침표(.)가 두 번 이상 연속된다면 하나의 마침표로 치환
    answer = answer.filter( (str , i) => {
        return str !== "." || (str === "." && answer[i+1] !== "." )
    })
    
    // 4. 마침표(.)가 처음이나 끝에 위치한다면 제거
    if( answer[0] === "."){
        answer = answer.slice( 1 )
    }
    function removeLastDot(){
        if ( answer[answer.length -1] === "." ){
            answer = answer.slice( 0, answer.length-1 )
        }
    }
    removeLastDot()
    
    // 5. 빈 문자열이면 소문자 a 대입
    if ( answer.length === 0 ) {
        answer.push("a")
    }
    
    // 6. 길이가 16자 이상이면 첫 15개를 제외한 나머지 문자를 모두 제거,
    // 제거 후 아이디 끝에 .이 있다면 마침표(.)를 제거
    if (answer.length >= 16){
        answer = answer.slice ( 0, 15 )
        removeLastDot()
    }
    
    // 7. 길이가 2자 이하면 길이가 3이 될 때 까지 아이디의 마지막 문자를 반복
    if (answer.length <= 2){
        const add = new Array( 3 - answer.length ).fill(answer[  answer.length-1 ] )
        answer = answer.concat( add )
        // answer = [...answer, ...add]
    }
    return answer.join("")
}