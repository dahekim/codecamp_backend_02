import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/users.entity";

@Injectable()
export class UserService{
    
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ){  }


    async create( { nickname_user } ){

        const result = await this.userRepository.save({ nickname_user })

        console.log(result)
        return result
    }
}