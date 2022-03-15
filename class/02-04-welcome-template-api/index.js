//회원가입 api


import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
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
    name:"철수",
    age:8,
    school:"다람쥐 초등학교",
    email:"a@a.com",
    password:"1234"
}

createUser(myuser)

