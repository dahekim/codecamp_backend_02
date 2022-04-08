import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bodypart } from "./entities/bodypart.entity";

@Injectable()
export class BodypartService{
    
    // 서비스에서 데이터베이스에서 연결을 받을 수 있는 개체? 객체?를 주입을 받음
    constructor(
        @InjectRepository(Bodypart)
        private readonly bodypartRepository: Repository<Bodypart>,
        // db에 연결할 수 있는 repository
        // 프로덕트카테고리레파지토리라는 Repository를 가져와
    ){  }


    async create( { name_part } ){
        // 카테고리를 데이터베이스에 저장, 백엔드와 DB가 통신을 하는 구간
        const result = await this.bodypartRepository.save({ name_part })

        console.log(result)
        return result
    }
}