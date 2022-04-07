import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Design } from "./entities/design.entity";



@Injectable()
export class DesignService{
    
    constructor(
        @InjectRepository(Design)
        private readonly designRepository: Repository<Design>,

    ){  }


    async create( { name_design } ){

        const result = await this.designRepository.save({ name_design })
        console.log(result)
        return result
    }

}