import{ validNumCount, withHypen , createMasking } from "./resident-registration-number.js"


function maskingRegiNum(regiNum){
    // 1. 주민등록번호 앞자리 뒷자리 숫자 갯수 확인
    const isValid = validNumCount(regiNum)

    // 2. 주민등록번호 가운데에 '-' 있는지 확인
    if(isValid===true){
        withHypen(regiNum)                             
    }
    
    // 3. 주민등록번호 뒷자리의 맨 앞 숫자 빼고 마스킹
    createMasking(regiNum)       

}

maskingRegiNum("930315-2222222")
