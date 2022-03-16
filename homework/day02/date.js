function getToday(){
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth()+1).padStart(2,"0")
    const dd = String(today.getDate()).padStart(2,"0")
    const hh = String(today.getHours()).padStart(2,"0")
    const mm1 = String(today.getMinutes()).padStart(2,"0")
    const ss = String(today.getSeconds()).padStart(2,"0")

    const TodayDate = `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hh}:${mm1}:${ss} 입니다.`
    console.log(TodayDate)

}

getToday()