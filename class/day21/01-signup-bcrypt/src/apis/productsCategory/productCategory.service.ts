import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductCategory } from "./entities/productCategory.entity";

@Injectable()
export class ProductCategoryService{
    
    // 서비스에서 데이터베이스에서 연결을 받을 수 있는 개체? 객체?를 주입을 받음
    constructor(
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>,
        // db에 연결할 수 있는 repository
        // 프로덕트카테고리레파지토리라는 Repository를 가져와
    ){  }


    async create( { name } ){
        // 카테고리를 데이터베이스에 저장, 백엔드와 DB가 통신을 하는 구간
        const result = await this.productCategoryRepository.save({ name })
        // 여기 ( ) 에 있는 내용을 DB에 저장해주세요~
        // " 'name'(FE에서 받아 온 변수명) 카테고리를 만들어주세요~ ""
        
        // key값이랑 value 이름이 같으면 생략 가능
        // = this.productCategoryRepository.save({ name: name })
        
        // productCategory.entity.ts에서 id는 자동생성 되었기 때문에 name만 지정한 것!
        // resolver에서 사용될 서비스


        // result에 담아서 리턴해주자~
        // 서비스로 리턴함 
        //서비스의 'his.productCategoryService.create( { name } )' 구간으로 넘어간다
        console.log(result)
        return result
    }

}