// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'

  const phNum = document.getElementById("PhoneNumber01").value + document.getElementById("PhoneNumber02").value + document.getElementById("PhoneNumber03").value
  await axios.post("http://localhost:3005/tokens/phone",{
    totalNum: phNum})
    .then((res) => {
      console.log(res)
  })
}


// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value
  const email = document.getElementById("SignupEmail").value
  const personal= document.getElementById("SignupPersonal").value
  const fvSite = document.getElementById("SignupPrefer").value
  const pw = document.getElementById("SignupPwd").value  
  const phNum = document.getElementById("PhoneNumber01").value + document.getElementById("PhoneNumber02").value + document.getElementById("PhoneNumber03").value
 
  
  console.log('회원 가입 이메일 전송')
  await axios.post("http://localhost:3005/user",{
    user: {                                         
      name, phNum, email, fvSite }
  })  
} 

