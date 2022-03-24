import{getToday} from './util.js'

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

export function getWelcomeTemplate({name,age,school}){
    const aaa = new Date()
    const yyyy = aaa.getFullYear()
    const mm = String(aaa.getMonth()+1).padStart(2,"0")
    const dd = String(aaa.getDate()).padStart(2,"0")

    const createdAt = `${yyyy}-${mm}-${dd}`

    return `<html>
                <body>
                    <h1>${name}님 가입을 환영합니다!!</h1>
                    <hr>
                    <div>이름: ${name}</div>
                    <div>나이: ${age}세</div>
                    <div>학교: ${school}</div>
                    <div>가입일: ${getToday}</div>
                </body>
            </html>`             

}

export function sendTemplateToEmail(email,mytemplate){
    console.log(`${email}로 ${mytemplate}을 전송합니다.`)
}
