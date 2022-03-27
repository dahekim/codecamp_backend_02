// 1. "-" 여부 검증
export function withHypen(regiNum){
    if(regiNum.includes("-") !== true){
        console.log("에러발생! 형식이 올바르지 않습니다.")
        return false
    }
    else {
        return true
    }
}

// 2. 주민등록번호 갯수 올바른지 검증
export function validNumCount(regiNum){
    if (regiNum.split("-")[0].length !== 6 || regiNum.split("-")[1].length !==7){
        console.log("에러발생!! 갯수를 제대로 입력해주세요!!")
        return false
    }    
    else{
        return true
    }
    
}

// 3. 주민등록번호 뒷부분 마스킹하기
export function createMasking(regiNum){
    const firstNum = regiNum.split("-")[0]

    return maskingNum = ( `${ firstNum }-*******` )
}