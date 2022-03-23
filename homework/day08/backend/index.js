import { checkValidationPh, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";


import express from "express"
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import cors from 'cors'
import { Tokens } from "./models/token.model.js"



dotenv.config()
const app = express()
const port = 3001
app.use(cors())
app.use( express.json())    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


// 회원목록 조회 API
app.get('/users', (req,res) => {
    const result = [
        {
            email : "aaa@gmail.com", 
	        name : "철수",
	        phone : "01012345678",
	        personal : "220110-2222222",
	        prefer : "https://naver.com"
        },
        {
            email : "bbb@gmail.com", 
	        name : "영희",
	        phone : "01045671238",
	        personal : "910110-1222222",
	        prefer : "https://daum.net"
        },
        {
            email : "ccc@gmail.com", 
	        name : "짱구",
	        phone : "01012345678",
	        personal : "650110-1212122",
	        prefer : "https://neflix.com"
        },
        {
            email : "ddd@gmail.com", 
	        name : "훈이",
	        phone : "01012345678",
	        personal : "980110-1111222",
	        prefer : "https://google.com"
        },
        {
            email : "eee@gmail.com", 
	        name : "맹구",
	        phone : "01012345678",
	        personal : "820110-1234222",
	        prefer : "https://notion.so"
        }     
    ]
    res.send(result)
  })

// 커피목록 조회 API
app.get('/starbucks', (req, res) => {
    const result2 = [
        {name: "아메리카노", kcal: 5},
        {name: "카페라떼", kcal: 250},
        {name: "녹차프라푸치노", kcal: 650},
        {name: "자몽허니블랙티", kcal: 250},
        {name: "오늘의 커피", kcal: 50},
        {name: "카라멜 마끼아또", kcal: 5000},
        {name: "흑임자라떼", kcal: 550},
        {name: "패션후르츠에이드", kcal: 355},
        {name: "연유라떼", kcal: 450},
        {name: "딸기프라푸치노", kcal: 500}
    ]
    res.send(result2)  
  })

  app.post("/tokens/phone",async (req,res) => {
    const phNum = req.body.phone  //postman에서 totalNum의 body 안에 담은 핸드폰 번호를 백엔드 서버로 보냄

        const isValid = checkValidationPh(phNum)

        let myToken = ''
        if (isValid===true){
          myToken = getToken()    
          
          sendTokenToSMS(phNum,myToken)
        
          res.send("인증완료!")
          }
        // 토큰 먼저 생성 하고 DB단 일 정하기

        const equalNum = await Tokens.findOne( {phone : req.body.phone} ) // 객체로 나옴!
        if(equalNum === null){      // DB에 내 번호가 없으면 새로 생성
          const tokens = new Tokens({
            phone: phNum,
            token: myToken,
            isAuth: false
        })
        await tokens.save() 
        }

        else {                      // DB에 내 번호가 있으면 토큰만 수정
          await Tokens.updateOne( { phone: phNum } ,  { token: myToken}  ) 
        }

    })

  

  // 2번 PATCH API
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

  
  //가입환영 템플릿 이메일 전송 api
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
  }                                   
  )
// 몽고DB 접속!! 
mongoose.connect("mongodb://my-database:27017/mini_project")

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })