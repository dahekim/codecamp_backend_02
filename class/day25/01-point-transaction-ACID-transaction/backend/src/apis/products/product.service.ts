import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductSaleslocation } from "../productsSaleslocation/entities/productSaleslocation.entity";
import { ProductTag } from "../productTag/entities/productTag.entity";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService{
    
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductSaleslocation)
        private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,

        @InjectRepository(ProductTag)
        private readonly productTagRepository: Repository<ProductTag>,
    ){ }

    async findAll(){
        return await this.productRepository.find({
            relations: [ 'productSaleslocation', 'productCategory', 'productTags' ]
        })
    }
    async findOne({productId}){
        return await this.productRepository.findOne({
            where: {id: productId},
            relations: [ 'productSaleslocation', 'productCategory' , 'productTags' ],
        })
    }


    async create( { createProductInput } ){
        const { productSaleslocation, productCategoryId, productTags, ...product } 
        = createProductInput  

        const result = await this.productSaleslocationRepository.save({
            ...productSaleslocation,
        })
        //productTags
        // ["#전자제품", "#중고"]

        // for문 사용해서 다수의 각각의 태그들 저장
        const result2 = []
        for( let i = 0; i < productTags.length; i ++ ) {
            const tagname =  productTags[i].replace("#", "")

            // 이미 등록되어있는 태그인지 확인해보기
            const prevTag = await this.productTagRepository.findOne({name: tagname})

            // 이미 있는 태그라면? 
            // 새로 등록할 필요 없이 result2에 넣어버리자!
            if(prevTag){
                result2.push(prevTag)
            }

            // 기존에 없던 새로운 태그라면?
            // 새로 넣어버리자! 
            else{
                const newTag = await this.productTagRepository.save( { name: tagname } )
                result2.push(newTag)
                // 0번째 인덱스에 있는 태그인데 # 빼줘!
                // 그걸 tagname 안에 넣어서 태그 이름을 tagname에 있는 값으로 전달해줘!
                // 빈 배열 result2 태그 이름을 넣은 변수를 추가해줘!
            }
        }
        
        return await this.productRepository.save({ 
            ...product,
            productSaleslocation : result,
            productCategory: { id: productCategoryId },
            productTags: result2,
            // 여러개라서 배열 형태로 전달 받아야한다
            // 아예 받아오는 변수를 배열형태로 전달받기! 이쪽에서 어떻게 하는거 아님
        })
    }

    async update({productId, updateProductInput}){
        const product = await this.productRepository.findOne({ 
            where: { id: productId }, 
        })

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
        if (product.isSoldout) 
            throw new UnprocessableEntityException("이미 판매 완료된 상품입니다.")
    }

    async delete( { productId } ){
        const result = await this.productRepository.softDelete( { id: productId } )
        return result.affected ? true : false
    }
}