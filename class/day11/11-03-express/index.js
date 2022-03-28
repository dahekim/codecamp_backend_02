// 0. yarn init, yarn add express 해서 express import 하기
import  express  from "express"

// 0. 앱 생성하기
const app = express()           

// 상품 구매 API
app.post("/products/buy", ( req, res ) => {
    // 상품 구매 로직 생성
    // 1. 상품 구매자가 가진 돈이 얼마인지 검증하는 코드 (~10줄 쯤)
    // class 처리할 것임
    // ...
    // ...

    // 2. 판매 여부를 검증하는 코드 (~10줄 쯤...)
    // class 처리할 것임
    // ...
    // ...

    // 3. 상품 구매 코드
    // if( 돈있음 && 판매중 ){
    // front에 아래 문구를 넘겨줌
    // res.send("상품 구매가 완료되었습니다.")
    // }
    
    
})


// 상품 환불 API
app.post("/products/refund", ( req, res ) => {
    // 상품 환불 로직 생성
    // 1. 판매 여부 검증 코드 ( 대략 열줄 )
    // class 처리할 것임
    // ...
    // ...

    // 2. 상품 환불 코드
    // class 처리할 것임 
    // if(!판매중){
    // front에 아래 문구를 넘겨줌
    // ...
    // ...
    // res.send("상품 환불이 완료되었습니다.")}
    
})


// 3000번 포트에서 24시간 동안 기다리자
app.listen(3000)