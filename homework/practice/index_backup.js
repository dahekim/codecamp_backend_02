function withHypen(regiNum){
    if(regiNum.includes("-") !== true){
        console.log("에러발생! 형식이 올바르지 않습니다.")
        return false
    }
    else {
        return true
    }
}

function validNumCount(regiNum){
    if (regiNum.split("-")[0].length !== 6 || regiNum.split("-")[1].length !==7){
        console.log("에러발생!! 갯수를 제대로 입력해주세요!!")
        return false
    }
    
    else{
        return true
    }
    
}

function createMasking(regiNum){
    const firstNum = regiNum.split("-")[0]
    const backNum = regiNum.split("-")[1]
    const maskingNum=[]
     
    maskingNum.push(backNum[0])
    for(let i = 1; i>=6; i++){
        maskingNum.push(backNum[i])
    }
        
    console.log(firstNum+"-"+maskingNum+"******")
}

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