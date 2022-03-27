import axios from "axios"

export function checkValidationPh(phNum){
    if (phNum.length!== 10 && phNum.length!==11){
        console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.")  
        return false
        }else{
        return true
    }
}

export function getToken(){
    const myCount = 6
    if (myCount===undefined){
        console.log("에러 발생!! 갯수를 제대로 입력해주세요.")  
        return;
    }    
    else if(myCount<=0){
        console.log("에러 발생!! 갯수가 너무 적습니다.")
        return;
    }
    else if(myCount>=10){   
        console.log("에러발생!! 갯수가 너무 많습니다.")
        return;
    }    
    const result = String(Math.floor(Math.random()*10**myCount)).padStart(myCount,"0")
    return result;
}

export async function sendTokenToSMS(phNum,myToken){ 

    const appKey = process.env.SMS_APP_KEY              
    const XSecretKey = process.env.SMS_X_SECRET_KEY
    const sender =process.env.SMS_SENDER
    
    await axios.post(`https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKey}/sender/sms`,      //END-POINT
    { 
            body : `안녕하세요!! 인증번호는 [${myToken}] 입니다.`,
            sendNo : sender,
            recipientList : [ { internationalRecipientNo : phNum } ]    
        },
        {
            headers:{
                "Content-Type" : "application/json;charset=UTF-8",
                "X-Secret-Key" : XSecretKey
            }
        }
    )

    console.log("전송 완료!")
}
