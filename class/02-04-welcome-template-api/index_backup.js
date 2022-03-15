//회원가입 api
function checkValidationEmail(email){
    //1. 이메일 존재 여부

    //2. "@" 포함 여부
    if(email.includes("@") !== true){
        console.log("이메일의 형식이 올바르지 않습니다.")
        return
    }

}

function createWelcomeTemplate({name,age,school}){
    const aaa = new Date()
    const yyyy = aaa.getFullYear()
    const mm = aaa.getMonth()+1
    const dd = aaa.getDate()

    const createdAt = `${yyyy}-${mm}-${dd}`

    return `<html>
                <body>
                    <h1>${name}님 가입을 환영합니다!!</h1>
                    <hr>
                    <div>이름: ${name}</div>
                    <div>나이: ${age}세</div>
                    <div>학교: ${school}</div>
                    <div>가입일: ${createdAt}</div>
                </body>
            </html>`             

}

function sendTemplateToEmail(email){
    console.log(`가입환영 템플릿을 ${email}에 전송합니다.`)
}



function createUser(){
    // 1. 이메일 주소가 정상인지 확인 (1-이메일 존재 여부ㅡ 2-"@" 포함여부)
    const isValid = checkValidationEmail(myuser)
    if (isValid){

    // 2. 가입환영 템플릿을 만들기
    createWelcomeTemplate()


    // 3. 사용자가 등록한 이메일로 가입환영 템플릿을 전송하기
    // (~~에 ~~를 전송했습니다. 형식)
    sendTemplateToEmail(email,)
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

