import { InputType, OmitType } from "@nestjs/graphql";
import { ProductSaleslocation } from "../entities/productSaleslocation.entity"
@InputType()
export class ProductSaleslocationInput 
extends OmitType(ProductSaleslocation, [ 'id' ], InputType ){
    
    // 원래는 이렇게 써야하지만...
    // PickType 또는 OmitType을 활용하여 타입을 재사용할 수 있다! 
    // @Field(()=> String)
    // addressDetail: string

    // @Field(()=> Float)
    // lat: number

    // @Field(()=> Float)
    // lng: number

    // @Field(()=> Date)
    // meetingTime: Date

    // 새로운 컬럼 추가도 가능하다
    // myColumn : String
}