import { checkValidationPh, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";

import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import { options }from "./swagger/config.js"
import mongoose from 'mongoose'
import { Board } from "./models/board.model.js"

import dotenv from "dotenv"

dotenv.config()


const app = express()
const port = 3000
app.use( express.json())    //전송되는 데이터를 json형태로 바꿔줌 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


app.get('/boards', async (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  // 꺼낸 데이터를 담기
  const result = await Board.find({})         // DB에 접속해서 찾을때까지 기다리고 

  // 2. 꺼내온 결과를 응답해주기
res.send(result)
})



app.post('/boards', async (req, res) => {
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  // 프론트엔드로부터 데이터를 받아오기 
  // 받아온 데이터를 console로 찍어서 있/없 확인
  req.body

  const board = new Board({                 // 넣고 싶은 데이터 넣기 
    // writer : req.body.writer ,
    // title : req.body.title,
    // contents : req.body.contents
    ...req.body
  })                                  // 임시 저장된 데이터를 board에 담기

  await board.save()                        // 저장완료, 이 API가 실행되고 저장되면 이 요청이 데이터베이스 서버(몽고 DB)로 날아간다! , 전송 검증은?
                                            //  =>저장 될 때까지 기다려~
  console.log(req)
  // 2. 저장결과를 알려주기
res.send('게시물이 등록되었습니다.')
})


app.post('/tokens/phone',(req,res)=>{
  const phNum = req.body.aaa  //postman에서 aaa의 body 안에 담은 핸드폰 번호를 백엔드 서버로 보냄

      const isValid = checkValidationPh(phNum)
    
      if (isValid===true){                    

      const myToken = getToken()  

      sendTokenToSMS(phNum,myToken)
      res.send("인증완료!")
      }

})




//가입환영 템플릿 이메일 전송 api
app.post("/users" ,  (req,res) => {
  const myUser = req.body.user

  // 1. 이메일 주소가 정상인지 확인 (1-이메일 존재 여부ㅡ 2-"@" 포함여부)
  const isValid = checkValidationEmail(myUser.email)

  if (isValid===true){
    // 2. 가입환영 템플릿을 만들기
    const myTemplate=getWelcomeTemplate(myUser)

    // 3. 사용자가 등록한 이메일로 가입환영 템플릿을 전송하기
    // (~~에 ~~를 전송했습니다. 형식)
    sendTemplateToEmail(myUser.email,myTemp)
  }
}                                   // 미들웨어 함수
)


/*
//게시글 수정하기
app.put('/boards', (req, res) => {
  console.log(req)
res.send('Hello World!')
})


//특정 id가 쓴 게시글 보기
app.get('/boards/:id', (req, res) => {
  console.log(req)
res.send('Hello World!')
})

//게시글 삭제하기
app.delete('/boards', (req, res) => {
  console.log(req)
res.send('Hello World!')
})
*/


// 몽고DB 접속!! 
mongoose.connect("mongodb://my-database:27017/code_camp")

// Backend API 서버 오픈!! (리슨)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})