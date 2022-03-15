import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./template.js";
function createUser(user){      //createUser({name, age,school,email, password})도 OK
    // 1. 이메일 주소가 정상인지 확인 (1-이메일 존재 여부ㅡ 2-"@" 포함여부)
    const isValid = checkValidationEmail(myuser.email)
    if (isValid===true){

    // 2. 가입환영 템플릿을 만들기
    const myTemp=getWelcomeTemplate(user)

    // 3. 사용자가 등록한 이메일로 가입환영 템플릿을 전송하기
    // (~~에 ~~를 전송했습니다. 형식)
    sendTemplateToEmail(user.email,myTemp)
    }
}

const myuser = {
    email:"kimdre88@naver.com",
    residentNum:"930315-2222222",
    phoneNum:"010-1234-1234",
    FavoriteSite:"https://www.netflix.com/kr/"
}

createUser(myuser)

