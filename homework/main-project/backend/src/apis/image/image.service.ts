import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Tattoo } from 'src/apis/tattoo/entities/tattoo.entity'
import { Image } from "./entities/image.entity";


@Injectable()
export class ImageService{
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository : Repository<Image>,

        @InjectRepository(Tattoo)
        private readonly tattooRepository : Repository<Tattoo>,
    ){}

    // tattooId, 이미지 urls을 테이블에 추가 
    async add({ tattooId, imgUrls }){
        const tattoo = await this.tattooRepository.findOne({ 
            where: { tattooId: tattooId }
        })
        
        const results = 
        await Promise.all(
            imgUrls.map( url => { this.imageRepository.save( { tattoo, url } )
            })
        )
        console.log(results)
        console.log("⭕️ 이미지 url 추가 완료")
        return results
    }

    // 이미지 테이블의 url 수정,
    async update({ tattooId, imgUrls }){
        await this.tattooRepository.softDelete({ tattooId : tattooId })

        const tattoo = await this.tattooRepository.findOne({ 
            where: { tattooId: tattooId }
        })
        const results = 
        await Promise.all(
            imgUrls.map( url => { this.imageRepository.save( { tattoo, url } )
            })
        )
        console.log(results)
        console.log("⭕️ 이미지 url 업데이트 완료")
        return results
    }
}