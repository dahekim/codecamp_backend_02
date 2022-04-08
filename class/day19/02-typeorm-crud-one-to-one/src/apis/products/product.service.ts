import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductSaleslocation } from "../productsSaleslocation/entities/productSaleslocation.entity";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService{
    
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductSaleslocation)
        private readonly productSaleslocationRepository: Repository<ProductSaleslocation>

    ){  }
    async findAll(){
        return await this.productRepository.find()
    }
    async findOne({productId}){
        // 어떤 걸 조회할 건지? 상품 id로 할 거임
        // 프론트에서 상품 id에 해당하는 값을 받아와야 한다
        return await this.productRepository.findOne( {id: productId} )
    }


    async create( { createProductInput } ){
        // 1. 상품만 등록하는 경우
        // 상품을 데이터베이스에 저장
        // const result = await this.productRepository.save({ 
        //     ...createProductInput,
        // })
        
        // console.log(result)

        // 2. 상품과 상품거래위치를 같이 등록하는 경우
        // 판매 위치도 같이 들어올 거야 (1:1)
        // injectable에서 레파지토리 생성
        
        const { productSaleslocation, ...product } = createProductInput  
        // 구조분해할당해서 삭제하고 싶은것을 제외하고 나머지를 ...product로 퉁!
        // name, description, price 와 productSaleslocation 로 나눔
        
        // 세일즈 로케이션을 먼저 등록해서 전체 객체가 나왔다!
        const result = await this.productSaleslocationRepository.save({
            
            ...productSaleslocation,
        })

        // result의 id를 등록, 상품 등록부터 연결까지!
        return await this.productRepository.save({ 
            ...product,
            productSaleslocation : result,

            // 위 코드와 동일하게 인식 
            // 프론트에서 받을 때 product 값은 다 받는데 saleslocation 값은 id밖에 못 받는다!       
            // productSaleslocation : { id: result.id } 
        })
        
    }

    async update({productId, updateProductInput}){
        // 1. 상품id, 수정할 내용 인풋 데이터를 가져오기
        const product = await this.productRepository.findOne({ 
            where: { id: productId }, 
        })

        // 업데이트 하고 싶은 내용만 수정하고, 나머지 데이터는 그대로 어떻게 두지?
        const newProduct = {
            ...product,
            ...updateProductInput,
        }

        return await this.productRepository.save(newProduct)
    }
    // 판매가 완료되었는지 체크하는 함수
    async checkSoldout( { productId } ) {
        const product = await this.productRepository.findOne( { 
            where: { id:productId },
        })
        
        // 판매가 완료된 경우 FE로 예외처리 알려줌
        if (product.isSoldout) 
            throw new UnprocessableEntityException("이미 판매 완료된 상품입니다.")
    }

    async delete( { productId } ){
        // 소프트 삭제 (TypeORM 에서 자체제공)
        // softDelete
        // 다양한 조건으로 삭제 가능
        const result = await this.productRepository.softDelete( { id: productId } )
        return result.affected ? true : false
    }
}