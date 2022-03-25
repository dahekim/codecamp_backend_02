import { checkValidationPh, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";


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
const port = 3001
app.use(cors())
app.use( express.json())    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


// 회원목록 조회 API
app.get('/users', async (req,res) => {
    const result = await Users.find( { } )
    res.send(result)
  })

app.post('/user', async (req, res) => {
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  // 프론트엔드로부터 데이터를 받아오기 
  // 받아온 데이터를 console로 찍어서 있/없 확인
  req.body
  
  const users = new Users({
    ...req.body
  })
  // 임시 저장된 데이터를 users에 담기

  const inputPhNum = await Users.findOne( {phone : req.body.phone} ) // 객체로 나옴!
  if(req.body.phone === inputPhNum.phone){      // DB에 내 번호가 없으면 새로 생성
    const tokens = new Tokens({
      ...req.body
    })
    await tokens.save()
  }
  else {                      // DB에 내 번호가 있으면 토큰만 수정
    await Tokens.updateOne( { phone: phNum } ,  { token: myToken}  ) 
  }



  // users.phone을 Tokens 문서에서 찾고
  // 있다면 isAuth의 value가 true라면 로직 수행
  // users.prefer로 받은 사이트를 cheerio를 활용해 scraping
  // 메타태그 정보를 다른 정보들과 함께 User DB에 저장
  // (og:title, description, image)
  // 주민등록번호는 뒷자리를 *로 바꿔서 저장
  // DB에 저장한 뒤 가입환영 이메일 전송
  // 
  
  await users.save()                        // 저장완료, 이 API가 실행되고 저장되면 이 요청이 데이터베이스 서버(몽고 DB)로 날아간다! , 전송 검증은?
                                            //  =>저장 될 때까지 기다려~
  console.log(req)
  // 2. 저장결과를 알려주기
res.send('회원가입이 완료되었습니다.')
})


// 커피목록 조회 API
app.get('/starbucks', async (req, res) => {
    const result2 =await Starbucks.find({})
    res.send(result2)  
  })


// 핸드폰 토큰 전송 & 핸드폰 번호, 인증번호, 인증번호 일치 여부를 DB로 보내는 API
app.post("/tokens/phone",async (req,res) => {
   //postman에서 totalNum의 body 안에 담은 핸드폰 번호를 백엔드 서버로 보냄
  const phNum = req.body.phone 
  const isValid = checkValidationPh(phNum)
  
  let myToken = ''
  if (isValid===true){
    myToken = getToken()
    sendTokenToSMS(phNum,myToken)
    
    res.send("인증완료!")
  }


  // 토큰 생성 이후에 DB에 정보를 넘김  
  const equalNum = await Tokens.findOne( {phone : req.body.phone} ) // 객체로 나옴!
  if(equalNum === null){      // DB에 내 번호가 없으면 새로 생성
    const tokens = new Tokens({
      ...req.body
    })
    await tokens.save()
  }
  else {                      // DB에 내 번호가 있으면 토큰만 수정
    await Tokens.updateOne( { phone: phNum } ,  { token: myToken}  ) 
  }
})


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
  const myUser = req.body.user
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