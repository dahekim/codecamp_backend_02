import axios from "axios"
import{ getToday } from './util.js'

export function checkValidationEmail(email){
    //1. 이메일 존재 여부
    //2. "@" 포함 여부
    if(!email.includes("@")|| email===undefined){       // @가 없거나 이메일이 비어있거나
        console.log("이메일의 형식이 올바르지 않습니다.")
        return false
    }
    else{
        return true
    }

}

export function getWelcomeTemplate( name,phNum,fvSite ){
    const createdAt = getToday()

    return `<html>
                <body>
                    <h1>${name} 님 가입을 환영합니다.</h1>
                    <hr>
                    <div>이름: ${name}</div>
                    <div>전화번호: ${phNum}</div>
                    <div>좋아하는 사이트: ${fvSite}</div>
                    <div>가입일:${createdAt}  </div>
                </body>
            </html>`             

}

export async function sendTemplateToEmail(email,myTemplate){
    
    const appKey = process.env.EMAIL_APP_KEY              //.env에 있는 SMS_APP_KEY 가져오기~ 
    const XSecretKey = process.env.EMAIL_X_SECRET_KEY
    const sender =process.env.EMAIL_SENDER

    await axios.post(`https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`,
        {
            senderAddress: sender,
            title : "가입을 환영합니다!",
            body : myTemplate ,
            receiverList: [ { receiveMailAddr: email ,receiveType: "MRT0" } ]
        },
        {
            headers:{
                "Content-Type" : "application/json;charset=UTF-8",
                "X-Secret-Key" : XSecretKey
            }
        }
    )
}
