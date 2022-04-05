import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tattoo } from "./entities/tattoo.entity";

@Injectable()
export class TattooService{

    constructor(
        @InjectRepository(Tattoo)
        private readonly tattooRepository: Repository<Tattoo>
    ) { }


    async findAll(){
        return await this.tattooRepository.find()
    }
    async findOne({tattooId}){
        return await this.tattooRepository.findOne({id_tattoo:tattooId})
    }


    async create({ createTattooInput }){
        const result = await this.tattooRepository.save({
            ...createTattooInput,
        })
        console.log(result)
        return result
    }

}