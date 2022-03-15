function withHypen(regiNum){
    if(regiNum.includes("-") !== true){
        console.log("에러발생! 형식이 올바르지 않습니다.")
        return false
    }
/*
    else{
        return regiNum
    }
*/
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
   withHypen(regiNum)
   const isValid = validNumCount(regiNum)
   if (isValid === true){
    createMasking(regiNum)
   }
}


const regiNum = "930315-2222222"
maskingRegiNum(regiNum)