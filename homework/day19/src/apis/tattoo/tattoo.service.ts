import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Design } from "../design/entities/design.entity";
import { Method } from "../method/entities/method.entity";
import { Tattoo } from "./entities/tattoo.entity";

@Injectable()
export class TattooService{

    constructor(
        @InjectRepository(Tattoo)
        private readonly tattooRepository: Repository<Tattoo>,

        @InjectRepository(Method)
        private readonly methodRepository: Repository<Method>,

        @InjectRepository(Design)
        private readonly designRepository: Repository<Design>,
    ) { }


    async findAll(){
        return await this.tattooRepository.find({
            relations: ['method', 'design', 'location', 
        'part', 'user', 'genre', 'type']
        })
    }
    async findOne({tattooId}){
        return await this.tattooRepository.findOne({
            where: {id_tattoo : tattooId},
            relations: ['method', 'design', 'location',
            'part', 'user', 'genre', 'type'] })
    }
    // 삭제한 데이터 포함 모든 데이터 조회
    async withDelete(){
        return await this.tattooRepository.find({
            withDeleted: true
        })
    }


    async create({ createTattooInput }){
        const {design, method, location,
            part, genre, type, user, ...tattoo } = createTattooInput
        const designResult = await this.designRepository.save({
            ...design
        })
        const methodResult = await this.methodRepository.save({
            ...method
        })

        const result = await this.tattooRepository.save({
            ...tattoo,
            design: designResult,
            method: methodResult,
            location: { name_location : location },
            part: { id_part : part },
            genre: { id_genre : genre },
            type: { id_type : type },
            user: { id_user : user},

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
    // 타투 삭제
    async delete ( { tattooId } ){
        const result = await this.tattooRepository.softDelete( { id_tattoo : tattooId } )
        return result.affected ? true : false
    }

    // 삭제 데이터 복구
    // true => false
    async restore( { tattooId } ){
        const result = await this.tattooRepository.restore( { id_tattoo : tattooId } )
        return result.affected ? false : true 
    }
}