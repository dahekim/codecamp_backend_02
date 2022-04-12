import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TattooType } from "./entities/tattooType.entity";

@Injectable()
export class TypeService{
    
    constructor(
        @InjectRepository(TattooType)
        private readonly typeRepository: Repository<TattooType>,
    ){  }


    async create( { name_type } ){

        const result = await this.typeRepository.save({ name_type })

        console.log(result)
        return result
    }
}