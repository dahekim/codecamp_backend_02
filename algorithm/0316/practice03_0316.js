//num은 10~30

function temperature(num){
  if(num>=24 && num<=30){
    console.log("조금 덥습니다.")
  }
  else if(num>=19 && num<=23){
    console.log("날씨가 좋네요.")
  }
  else if(num<=18 && num>=10){
    console.log("조금 춥네요.")
  }
  else{
    console.log("잘못된 입력입니다.")
  }
}

temperature(24) //'조금 덥습니다.'

temperature(20)	//'날씨가 좋네요.'

temperature(13)	//'조금 춥네요.'

temperature(31) // '잘못된 입력입니다.'