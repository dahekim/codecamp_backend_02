function temperature(num){
  if(num>=24){
    console.log("조금 덥습니다.")
  }
  else if(num>=18){
    console.log("날씨가 좋네요.")
  }
  else
    console.log("조금 춥네요.")
}

temperature(24) //'조금 덥습니다.'

temperature(20)	//'조금 덥습니다.'

temperature(1)	//'조금 덥습니다.'
