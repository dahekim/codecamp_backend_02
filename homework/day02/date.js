function getToday(){
    const aaa = new Date()
    const yyyy = aaa.getFullYear()
    const mm = String(aaa.getMonth()+1).padStart(2,"0")
    const dd = String(aaa.getDate()).padStart(2,"0")
    const hh = String(aaa.getHours()).padStart(2,"0")
    const mm1 = String(aaa.getMinutes()).padStart(2,"0")
    const ss = String(aaa.getSeconds()).padStart(2,"0")

    const TodayDate = `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hh}:${mm1}:${ss} 입니다.`
    console.log(TodayDate)

}

getToday()