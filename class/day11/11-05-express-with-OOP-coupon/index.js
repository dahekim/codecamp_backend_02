import  express  from "express"

import { ProductController } from "./mvc/controllers/product.controller.js"
import { CouponController } from "./mvc/controllers/coupon.controller.js"


const app = express()           

// 상품 API
const productController = new ProductController()         // 객체 'productController'에 ProductController 를 새로 만들어서 담음
app.post("/products/buy", productController.buyProduct)     // 상품 구매 API, product.controller.js에 있는 buyProduct 불러옴
app.post("/products/refund", productController.refundProduct) // 상품 환불 API, product.controller.js에 있는 refundProduct 불러옴


// 쿠폰(상품권) 구매 API
const couponController = new CouponController()
app.post("/coupons/buy" , couponController.buyCoupon)

app.listen(3000)