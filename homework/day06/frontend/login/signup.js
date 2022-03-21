// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'

  const phNum = document.getElementById("PhoneNumber01").value + document.getElementById("PhoneNumber02").value + document.getElementById("PhoneNumber03").value
  console.log(phNum)

  function checkValidationPh(phNum){
    if (phNum.length!== 10 && phNum.length!==11){
        console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.")  
        return false
        }else{
        return true
    }
}

function getToken(){
    const myCount = 6
    if (myCount===undefined){
        console.log("에러 발생!! 갯수를 제대로 입력해주세요.")  
        return;
    }    
    else if(myCount<=0){
        console.log("에러 발생!! 갯수가 너무 적습니다.")
        return;
    }
    else if(myCount>=10){   
        console.log("에러발생!! 갯수가 너무 많습니다.")
        return;
    }    
    const result = String(Math.floor(Math.random()*10**myCount)).padStart(myCount,"0")
//  console.log(result);
    return result;
}

async function sendTokenToSMS(phNum,myToken){ 
    const phNum = document.getElementById("PhoneNumber01").value +document.getElementById("PhoneNumber02").value + document.getElementById("PhoneNumber03").value
    axios.post("http://localhost:3001/tokens/phone", {
        data : {myPhone: `${phNum}`}
    }).then((res) => {
        console.log(res)
    })
}
    console.log('인증 번호 전송')
    await axios.post(`https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKey}/sender/sms`,      //END-POINT
    { 
            body : `안녕하세요. 인증번호는 [${myToken}] 입니다.`,
            sendNo : sender,
            recipientList : [ { internationalRecipientNo : phNum } ]    
        },
        )}



// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value
  const personal= document.getElementById("SignupPersonal").value
  const phNum = document.getElementById("PhoneNumber01").value + document.getElementById("PhoneNumber02").value + document.getElementById("PhoneNumber03").value
  const fvSite = document.getElementById("SignupPrefer").value
  const email = document.getElementById("SignupEmail").value
  const pw = document.getElementById("SignupPwd").value
  
  console.log('회원 가입 이메일 전송')
  await axios.post("http://localhost:3001/users",{
    user: {
      name,phNum,email,fvSite}
  })
  console.log('메일 전송 성공')
  
} 

