import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { CreateProductInput } from "./dto/createProduct.input"
import { UpdateProductInput } from "./dto/updateProduct.input"

import { Product } from "./entities/product.entity"
import { ProductService } from "./product.service"

@Resolver()
export class ProductResolver{
    constructor(
        private readonly productService: ProductService,
        private readonly elasticsearchService: ElasticsearchService,
        ){ }

    //  상품 목록 전체 받아오기
    @Query( ()=> [Product])
    async fetchProducts(
        @Args("search") search:string
    ){
        // 엘라스틱서치에서 조회
        const result = await this.elasticsearchService.search({
            index: "myproduct0222",
            query: {
                match:{
                    description: search,
                }
            },
        })
        console.log(JSON.stringify(result, null,' '))
        // 엘라스틱서치에서 조회해보기 위해 임시로 주석
        // return this.productService.findAll()
    }

    // 상품 하나 받아오기
    @Query( () => Product )
    fetchProduct(
        @Args('productId') productId: string,
        ){
            return this.productService.findOne( {productId} )
        }

    @Mutation(()=> Product)
    async createProduct( 
        @Args('createProductInput') createProductInput: CreateProductInput,
        ) {
            return this.productService.create( { createProductInput } )
        }

    @Mutation(() => Product)
    async updateProduct(
        @Args("productId") productId : string,
        @Args("updateProductInput") updateProductInput: UpdateProductInput,
    ) {

        // 판매 완료가 되었는지 확인해보기
        await this.productService.checkSoldout({productId})
        
        // 수정하기
        return await this.productService.update( { productId, updateProductInput } )
    }
    // 삭제
    // 삭제 했으면  true, 아니면 false인 boolean 타입으로 리턴!
    @Mutation( () => Boolean )
    deleteProduct(
        @Args("productId") productId : string,){
        return this.productService.delete( { productId } )}
}