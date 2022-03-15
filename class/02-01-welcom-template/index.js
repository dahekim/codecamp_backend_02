const apple = 3
const banana =2


console.log("철수는 사과를 "+ apple +"개, 바나나를 " +banana+ "개 가지고 있다.")
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있다.`)          //템플릿 리터럴




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
            </html>`                   // 이 함수가 작동하면 최종적으로 나오는 결과(1)
}
const myname = "철수"
const myage = 13
const myschool = "다람쥐 초등학교"
const mycreatedAt = "2020-01-02"          // 밖에서 만들어서 함수 안으로 넣는다!

getWelcomeTemplate(myname,myage,myschool,mycreatedAt)
