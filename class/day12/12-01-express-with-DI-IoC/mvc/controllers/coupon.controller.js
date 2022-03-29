import { CashService } from "./services/cash.service.js"

export class CouponController{
    constructor(monyService){
        this.monyService = monyService
    }

    buyCoupon = ( req, res ) => {
    // 1. 가진 돈 검증 코드
    const hasMoney = this.monyService.checkValue()

    // 2. 쿠폰을 구매하는 코드
    if(hasMoney){
        res.send("쿠폰 구매가 완료되었습니다.")}
    }
}