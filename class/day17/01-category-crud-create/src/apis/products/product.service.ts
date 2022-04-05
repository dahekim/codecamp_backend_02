import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService{
    
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

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
        // 상품을 데이터베이스에 저장
        const result = await this.productRepository.save({ 
            ...createProductInput,
            // 하나하나 직접 나열하기는 너무 귀찬어.
            /*
            name: createProductInput.name,
            description: createProductInput.description,
            price: createProductInput.price,
            */
        })
        
        console.log(result)
        return result
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
        
        //  위의 코드와 똑같이 작동한다!
        // HttpException("메세지", status code)
        // NestJs에서 사용하는 http 상태...뭐? 를 보내줌 (상태코드로 변환되어서 나감)(422)
        // 근데 매번 이럴수 없으니까 한방처리를 해보자
        /*
        if( product.isSoldout ){
            throw new HttpException( "이미 판매 완료된 상품입니다.", HttpStatus.UNPROCESSABLE_ENTITY )
        }
        */
        

    }
}