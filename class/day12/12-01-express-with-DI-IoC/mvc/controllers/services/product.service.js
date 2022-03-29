// 제품 관련 기능들을 class로 묶어놓음 > product.js
// 파일로 분리해놨기 때문에 export 해줘야함

export class ProductService {
    
    // 1. 판매 여부를 검증하는 코드
    checkSoldout = () =>{
        console.log("판매완료 되었는지 검증합니다!")

    }
}