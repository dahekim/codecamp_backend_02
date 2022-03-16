// facade 구조로 변경

import { withHypen, validNumCount, createMasking} from "./resident-registration-number.js"

function maskingRegiNum(regiNum){
   const isValid_1 = withHypen(regiNum)                 // 검증1: withHypen이 true일 때 validNumCount 실행, false라면 함수 종료
   if (isValid_1){
       const isValid_2 = validNumCount(regiNum)         // 검증2: validNumCount가 true일 때 creatMasking 실행, false라면 함수 종료
       if (isValid_2){
           createMasking(regiNum)
    }
   }   
}

const regiNum = "930315-2222222"
maskingRegiNum(regiNum)