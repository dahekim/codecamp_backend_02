import  express  from "express"
import { CashService } from './cash.js'
import { ProductService } from './product.js'
// 파일에 있던 클래스 CashService와 ProductService가 각각 다른 파일로 빠졌기 때문에 import 해야함


const app = express()           

// 상품 구매 API
app.post("/products/buy", ( req, res ) => {
    // 1. 가진 돈 검증 코드  (CashService의 checkValue와 같음) (10줄 -> 2줄로 짧아졌다~)
    const cashService = new CashService()                   // Cash와 관련된 모든 기능이 객체(=인스턴스) 'cashService'에 들어가있다!
    const hasMoney = cashService.checkValue()               // return true or false 


    // 2. 판매 여부 검증 코드 (ProductService의 CheckSoldout과 동일)(10줄 -> 2줄)
    const productService = new ProductService               // Product와 관련된 모든 기능이 객체(=인스턴스) 'produckService'에 들어갔음
    const isSoldout = productService.checkSoldout()         // return true or false 
    

    // 3. 상품 구매 코드
    // hasMoney가 true이고 (생략가능) 와 isSoldout이 false면 (판매중이면)( !isSoldout === true )
    if( hasMoney && !isSoldout ){
        res.send("상품 구매가 완료되었습니다.")
    }
        
})


// 상품 환불 API
app.post("/products/refund", ( req, res ) => {
    // 1. 판매 여부 검증 코드 
    const productService = new ProductService               
    const isSoldout = productService.checkSoldout()         

    // 2. 상품 환불 코드 
    if(!isSoldout){
    res.send("상품 환불이 완료되었습니다.")}
})


// 3000번 포트에서 24시간 동안 기다리자
app.listen(3000)