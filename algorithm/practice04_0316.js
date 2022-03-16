function days (month){
  if(month === 2 ){
    console.log(`${month}월 : 28일`)   
  }
  else if (month === 4 || month === 6 || month === 9 || month === 11){
    console.log(`${month}월 : 30일`)   
  }
  else{
    console.log(`${month}월 : 31일`)   
  }
}

days(1)	//'1월 : 31일'
days(2)	//'2월 : 28일'
days(3)	//'3월 : 31일'
days(8) //'8월 : 31일'