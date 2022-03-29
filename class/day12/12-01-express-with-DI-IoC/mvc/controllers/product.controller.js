//import { CashService } from "./services/cash.service.js"
//import { ProductService } from "./services/product.service.js"


export class ProductController{
    constructor(moneyService, productService){
        this.moneyService = moneyService            // 위에서 받은 moneyService를 여기에 받아주라
        this.productService = productService        // 위에서 받은 productService를 여기에 받아주라
    }

    //index.js의 ProductController() 안에 있는 인자들이 constructor로 들어감

    buyProduct =  ( req, res ) => {
        // 1. 가진 돈 검증 코드
        const hasMoney = this.moneyService.checkValue()
    
        // 2. 판매 여부 검증 코드 
        const isSoldout = this.productService.checkSoldout()
        
    
        // 3. 상품 구매 코드
        if( hasMoney && !isSoldout ){
            res.send("상품 구매가 완료되었습니다.")
        }
    }

    refundProduct = ( req, res ) => {
        // 1. 판매 여부 검증 코드            
        const isSoldout = this.productService.checkSoldout()         
    
        // 2. 상품 환불 코드 
        if(!isSoldout){
        res.send("상품 환불이 완료되었습니다.")}
    }
}