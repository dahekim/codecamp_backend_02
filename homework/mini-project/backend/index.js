import { checkValidationPh, getToken } from "./phone.js"
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js"
import { createMasking } from "./resident-registration-number.js"
//import { createUsersAPI } from "./cheerio.scraping.js"

import express from "express"
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import cors from 'cors'


import { options } from './swagger/config.js'
import { Tokens } from "./models/token.model.js"
import { Users } from "./models/user.model.js"
import { Starbucks } from "./models/starbucks.model.js"



dotenv.config()
const app = express()
const port = 3005
app.use(cors())
app.use( express.json())    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));



// 회원목록 조회 API
app.get('/users', async (req,res) => {
    const result = await Users.find( { } )
    res.send(result)
  })



// 회원 가입 API
app.post('/user', async (req, res) => {
  const phNumInToken = await Tokens.findOne( { phone : req.body.phone } )
  const phNumInUsers = await Users.findOne( { phone : req.body.phone } )
   

  if(phNumInToken === null){
    res.send("먼저 인증을 진행해주세요.") 
    return
  }

  // 1. 이미 인증이 됐거나, 핸드폰번호가 Users에 있다면
  // 이미 가입한 회원이라는 메시지 반환  
  else if(phNumInToken.isAuth === true && phNumInToken.phone === req.body.phone
    && phNumInUsers === req.body.phone){
    res.send("이미 가입한 회원입니다.")
    return
  }

  // 2. Tokens에 있는 isAuth가 false 거나 핸드폰 번호가 없다면 에러메시지 출력
  // 에러메시지 반환, 에러 상태코드 422  
  else if(phNumInToken.isAuth === false)
  {
    res.status(422).send({ error: '에러!! 핸드폰 번호가 인증되지 않았습니다.' })
    return
  }

  // 3. isAuth가 true이고, Users에도 입력한 핸드폰 번호가 존재하지 않는다면
  // 데이터를 등록하는 로직 수행 => DB에 접속해서 데이터 저장하기
  else
  { 
    // 4. 내가 좋아하는 사이트로 입력받은 사이트를 스크래핑 
//    createUsersAPI(req.body.prefer)

    // 5. 주민등록번호 검증 및 마스킹
    const regiNum = req.body.personal 
    const maskingRegiNum = createMasking(regiNum)
  
    await Users.updateOne( { phone : req.body.phone } ,  { personal: maskingRegiNum } )
    

    // 임시 저장된 데이터를 users에 담기
    const users = new Users({
      ...req.body 
    })

    // 2. 저장결과를 알려주기
    res.send("회원가입이 완료되었습니다.")
//    res.send(${})   // _id값 반환
    await users.save()
  }

})



// 커피목록 조회 API
app.get('/starbucks', async (req, res) => {
    const coffeeList = await Starbucks.find({})
    res.send(coffeeList)  
  })



// 토큰 인증 요청 API
// 핸드폰 토큰 전송 & 핸드폰 번호, 인증번호, 인증번호 일치 여부를 DB로 보내는 API
app.post("/tokens/phone",async (req,res) => {
   //postman에서 totalNum의 body 안에 담은 핸드폰 번호를 백엔드 서버로 보냄
  const phNum = req.body.phone 
  const isValid = checkValidationPh(phNum)
  
  let myToken = ''
  if (isValid===true){
    myToken = getToken()
//    sendTokenToSMS(phNum,myToken)
    
    res.send("인증완료!")
  }


  // 토큰 생성 이후에 DB에 정보를 넘김  
  const equalNum = await Tokens.findOne( {phone : req.body.phone} ) // 객체로 나옴!
  if(equalNum === null){      // DB에 내 번호가 없으면 새로 생성
    const tokens = new Tokens({
      token: myToken,
      phone: phNum,
      isAuth: false
    })
    await tokens.save()
  }
  else {                      // DB에 내 번호가 있으면 토큰만 수정
    await Tokens.updateOne( { phone: phNum } ,  { token: myToken } ) 
    await Tokens.updateOne( { phone: phNum } ,  { isAuth: false} ) 
  }
})


// 토큰 인증 완료 API
// DB에 핸드폰 번호가 존재할 경우, DB가 새로 쌓이지 않고 인증번호만 수정하는 API
app.patch("/tokens/phone",async (req,res) => {
  const myPhNum = await Tokens.findOne( {phone : req.body.phone} )

  if(req.body.phone !== myPhNum.phone ||  req.body.token !== myPhNum.token){
    res.send("false")
  }
  else{
    await Tokens.updateOne( { phone : req.body.phone } ,  { isAuth: true }  )
    res.send("true")
  }
})

  
//가입환영 템플릿 이메일 전송 API
app.post("/users" ,  (req,res) => {   ///이걸 보내줘~
  const myUser = req.body.email
  // 1. 이메일 주소가 정상인지 확인 (1-이메일 존재 여부ㅡ 2-"@" 포함여부)
  const isValid = checkValidationEmail(myUser.email)
  
    if (isValid===true){
      // 2. 가입환영 템플릿을 만들기
      const myTemplate=getWelcomeTemplate(myUser)
  
      // 3. 사용자가 등록한 이메일로 가입환영 템플릿을 전송하기
      // (~~에 ~~를 전송했습니다. 형식)
      sendTemplateToEmail(myUser.email,myTemplate)
    }
    res.send("이메일을 전송했습니다.")
  })


// 몽고DB 접속 
mongoose.connect("mongodb://my-database:27017/mini_project")

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })