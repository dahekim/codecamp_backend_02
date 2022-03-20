import express from "express"
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'

const app = express()
const port = 3001
app.use( express.json())    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


// 회원목록 조회 API
app.get('/users', (req, res) => {
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
    const result = [
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
  res.send(result)
  })




  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })