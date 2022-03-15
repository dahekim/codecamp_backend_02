/*
const apple = 3
const banana =2


console.log("철수는 사과를 "+ apple +"개, 바나나를 " +banana+ "개 가지고 있다.")
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있다.`)          //템플릿 리터럴
*/
/*
function getWelcomeTemplate(name, age, school, createdAt){
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
const myname = "철수"
const myage = 13
const myschool = "다람쥐 초등학교"
const mycreatedAt = "2020-01-02"          
// 위의 요소들을 하나하나 보내는게 아니라 묶어서 보내기
getWelcomeTemplate(myname,myage,myschool,mycreatedAt)
*/

function getWelcomeTemplate(user){                          // 매개변수 주의! getWelcomeTemplated의 myuser가 user 을 받음
    return `<html>
                <body>
                    <h1>${user.myname}님 가입을 환영합니다!!</h1>
                    <hr>
                    <div>이름: ${user.myname}</div>
                    <div>나이: ${user.myage}세</div>
                    <div>학교: ${user.myschool}</div>
                    <div>가입일: ${user.mycreatedAt}</div>
                </body>
            </html>`                   
}
const myuser = {
    myname:"철수",
    myage: 13,
    myschool:"다람쥐 초등학교",
    mycreatedAt:"2020-01-02"
}

getWelcomeTemplate(myuser)