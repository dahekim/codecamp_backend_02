function solution(s) {
    if(s.length === 4 || s.length === 6){
        for(let i = 0 ; i < s.length ; i ++){
            if(!isNaN(s[i])===false){
                return false
            }return true
        }
    }
    return false
}


// 0으로 이뤄진 문자열일 경우 테스트케이스 11에서 오류 날 수 있음
// 고쳐야함
