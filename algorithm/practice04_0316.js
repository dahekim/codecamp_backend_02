function days (month){
  if (month <=12){
    if(month === 2 ){
      console.log(`${month}월 : 28일`)   
    }
    else if (month === 4 || 
      month === 6 || 
      month === 9 || 
      month === 11){
      console.log(`${month}월 : 30일`)   
    }
    else{
      console.log(`${month}월 : 31일`)   
    }
  }
  else {
    console.log("잘못된 입력입니다.")
  }
}

days(1)	  //'1월 : 31일'
days(2)	  //'2월 : 28일'
days(3)	  //'3월 : 31일'
days(4)   //'4월 : 30일'
days(5)   //'5월 : 31일'
days(6)   //'6월 : 30일'
days(7)   //'7월 : 31일'
days(8)   //'8월 : 31일'
days(9)   //'9월 : 30일'
days(10)  //'10월 : 31일'
days(11)  //'11월 : 30일'
days(12)  //'12월 : 31일'
days(13)  //'잘못된 입력입니다.'