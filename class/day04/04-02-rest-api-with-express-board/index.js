import { checkValidationPh, getToken, sendTokenToSMS } from "../01-05-token-count-api-facade-import/phone.js";


//const express = require('express')
import express from "express"
const app = express()
const port = 3000

app.use( express.json())    //전송되는 데이터를 json형태로 바꿔줌 

//게시글 목록보기
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

//게시글 올리기
app.post('/boards', (req, res) => {
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  // 프론트엔드로부터 데이터를 받아오기 
  // 받아온 데이터를 console로 찍어서 있/없 확인
  console.log(req.body)
  
  console.log(req)
  // 2. 저장결과를 알려주기
res.send('게시물이 등록되었습니다.')
})


app.post('/token/phone',(req,res)=>{

      const isValid = checkValidationPh(req)
    
      if (isValid===true){                    

      const myToken = getToken()  

      sendTokenToSMS(req,myToken)
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