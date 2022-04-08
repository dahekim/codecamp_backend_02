import { Injectable, UnprocessableEntityException } from "@nestjs/common";
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
        return await this.productRepository.find({
            relations: [ 'productSaleslocation', 'productCategory' ]
            // 조인해주세요
        })
    }
    async findOne({productId}){
        return await this.productRepository.findOne({
            where: {id: productId},
            relations: [ 'productSaleslocation', 'productCategory' ],
            // 조인해주셔요
        })
    }


    async create( { createProductInput } ){
        const { productSaleslocation, productCategoryId,  ...product } = createProductInput  
        const result = await this.productSaleslocationRepository.save({
            ...productSaleslocation,
        })
        return await this.productRepository.save({ 
            ...product,
            productSaleslocation : result,
            productCategory: { id: productCategoryId }, // 카테고리 추가(result 통째로 vs id만 넣기)
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