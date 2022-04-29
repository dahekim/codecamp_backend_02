import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ProductCategory } from "./entities/productCategory.entity";
import { ProductCategoryService } from "./productCategory.service";

@Resolver()
export class ProductCategoryResolver{
    // 서비스를 주입받는다!
    constructor(private readonly productCategoryService: ProductCategoryService,){

    }


    // 카테고리를 등록해줘! 카테고리를 등록하는 서비스가 필요함 (service.ts)
    @Mutation(()=> ProductCategory) // ProductCategory 객체를 받아온다
    createProductCategory( 
        @Args("name") name: string, // string type의 name argument로 받아서 서비스에 넘겨준다
        ){
        // productCategoryService 서비스의 create()를 가져온다
        // 구조분해할당을 통해 객체형태로 데이터 전달
        // FE으로 ProductCategory의 데이터 내용이 객체형태로 간다 (id, name)
        // service에서 온 'result'가 다시 오는 것임
        return this.productCategoryService.create( { name } )
        
    }
}