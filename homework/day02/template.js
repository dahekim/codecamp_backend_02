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

export function getWelcomeTemplate({email,residentNum,phoneNum,FavoriteSite}){

    return `<html>
                <body>
                    <h1>${email}님 가입을 환영합니다!!</h1>
                    <hr>
                    <div>이메일: ${email}</div>
                    <div>주민등록번호: ${residentNum}</div>
                    <div>휴대전화 번호: ${phoneNum}</div>
                    <div>내가 좋아하는 사이트: ${FavoriteSite}</div>
                </body>
            </html>`             

}

export function sendTemplateToEmail(email,mytemplate){
    console.log(`${email}로 ${mytemplate}을 전송합니다.`)
}
