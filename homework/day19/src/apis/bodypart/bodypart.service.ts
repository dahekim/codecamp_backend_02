import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bodypart } from "./entities/bodypart.entity";

@Injectable()
export class BodypartService{
    constructor(
        @InjectRepository(Bodypart)
        private readonly bodypartRepository: Repository<Bodypart>,
    ){  }

    async create( { name_part } ){
        const result = await this.bodypartRepository.save({ name_part })
        console.log(result)
        return result
    }
}