import { checkValidationPh, getToken, sendTokenToSMS } from "./phone.js";



//const express = require('express')
import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import { options }from "./swagger/config.js"

import dotenv from "dotenv"
dotenv.config()

/*
dotenv.config(process.env.SMS_APP_KEY)             // dotenv 라이브러리를 통해서 .env에 있는 key...들을 읽어올 수 있게
dotenv.config(process.env.SMS_X_SECRET_KEY)
dotenv.config(process.env.SMS_SENDER)
*/

const app = express()
const port = 3000
app.use( express.json())    //전송되는 데이터를 json형태로 바꿔줌 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


app.get('/boards', (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  // 꺼낸 데이터를 담기
  const result = [
    {number: 1,writer:"철수",title:"철수가썼어요",contents:"토끼짱"},
    {number: 2,writer:"영희",title:"영희가썼어요",contents:"안녕하세요"},
    {number: 3,writer:"훈이",title:"훈이가썼ㅇ요",contents:"민트초코"}
  ]
  // 2. 꺼내온 결과를 응답해주기
res.send(result)
})



app.post('/boards', (req, res) => {
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  // 프론트엔드로부터 데이터를 받아오기 
  // 받아온 데이터를 console로 찍어서 있/없 확인
  console.log(req.body)
  
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})