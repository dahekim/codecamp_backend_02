
//구조분해할당 구조로 변환
function getWelcomeTemplate({myname,myage,myschool}){           // 받을 때 객체로 받음, 따라서 순서가 상관이 없어지게 된다~~ , 가입일은 유동적이므로 삭제

    // 여기서 오늘 날짜로 만들어서 mycreatedAt에 넣기, 새로운 메소드 필요
    const aaa = new Date()
    const yyyy = aaa.getFullYear()
    const mm = aaa.getMonth()+1
    const dd = aaa.getDate()

    const createdAt = `${yyyy}-${mm}-${dd}`
    //yyyy+"-"+mm+"-"+dd

    return `<html>
                <body>
                    <h1>${myname}님 가입을 환영합니다!!</h1>
                    <hr>
                    <div>이름: ${myname}</div>
                    <div>나이: ${myage}세</div>
                    <div>학교: ${myschool}</div>
                    <div>가입일: ${createdAt}</div>
                </body>
            </html>`                   
}

const myuser = {
    myname:"철수",
    myage: 13,
    myschool:"다람쥐 초등학교"
}

getWelcomeTemplate(myuser)                                                          // myuser = {myname:~, myage:~,myschool"~} 들어

//확인용
/*
const result = getWelcomeTemplate(myuser)
console.log(result)
*/