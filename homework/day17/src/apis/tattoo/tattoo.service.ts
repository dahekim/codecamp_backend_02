import { Injectable, UnprocessableEntityException } from "@nestjs/common";
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
    
    async update({tattooId, updateTattooInput}){
        const tattoo = await this.tattooRepository.findOne({
            where: { id_tattoo : tattooId }
        })

        const updateTattoo = {
            ...tattoo,
            ...updateTattooInput,
        }
        return await this.tattooRepository.save(updateTattoo)
    }

    // 작업 착수 여부 체크 함수
    async checkStart( {tattooId} ){
        const tattoo = await this.tattooRepository.findOne({
            where: { id_tattoo: tattooId },
        })

        if (tattoo.isStart)
        throw new UnprocessableEntityException("타투 작업이 착수되어 수정이 불가능합니다!")
    }
}