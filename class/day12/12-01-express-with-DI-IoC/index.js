import  express  from "express"

import { ProductController } from "./mvc/controllers/product.controller.js"
import { CouponController } from "./mvc/controllers/coupon.controller.js"

import { ProductService } from "./mvc/controllers/services/product.service.js"
import { CashService } from "./mvc/controllers/services/cash.service.js"
import { PointService } from "./mvc/controllers/services/point.service.js"

const app = express()           

// new 한번으로 모든 곳에서 재사용 가능(싱글톤 패턴)
const productService = new ProductService()
const cashService = new CashService()   
const pointService = new PointService()

// 상품 API
const productController = new ProductController(cashService, productService)         // 객체 'productController'에 ProductController 를 새로 만들어서 담음, ( ) 안에 들어간 건 Constructor로 들어감
app.post("/products/buy", productController.buyProduct)     // 상품 구매 API, product.controller.js에 있는 buyProduct 불러옴
app.post("/products/refund", productController.refundProduct) // 상품 환불 API, product.controller.js에 있는 refundProduct 불러옴


// 쿠폰(상품권) 구매 API
const couponController = new CouponController(pointService)
app.post("/coupons/buy" , couponController.buyCoupon)

app.listen(3000)