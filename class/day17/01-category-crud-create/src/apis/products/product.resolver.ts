import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateProductInput } from "./dto/createProduct.input";
import { UpdateProductInput } from "./dto/updateProduct.input";

import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";

@Resolver()
export class ProductResolver{
    // 서비스를 주입받는다!
    constructor(private readonly productService: ProductService,){ }

    //  상품 목록 전체 받아오기
    @Query( ()=> [Product])
    fetchProducts(){
        return this.productService.findAll()
    }

    // 상품 하나 받아오기
    // nestjs/graphql 에서 받아오기
    @Query( () => Product )
    fetchProduct(
        // 아규먼트로 프론트엔드에서 아이디를 productId(string type)으로 받아오기
        @Args('productId') productId: string,
        ){
            return this.productService.findOne( {productId} )
        }

    @Mutation(()=> Product) // Product 객체를 받아온다
    createProduct( 
        @Args('createProductInput') createProductInput: CreateProductInput,
        ) {

        return this.productService.create( { createProductInput } )
        
    }
    @Mutation(() => Product)
    async updateProduct(
        // 수정할 상품 id, 수정할 내용을 전달!
        @Args("productId") productId : string,
        @Args("updateProductInput") updateProductInput: UpdateProductInput,
    ) {

        // 판매 완료가 되었는지 확인해보기
        // 판매 완료가 될 때까지 실행되면 안돼서 await 
        await this.productService.checkSoldout({productId})
        
        // 수정하기
        return await this.productService.update( { productId, updateProductInput } )
    }
}