import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ImageService } from "./image.service";

@Resolver()
export class ImageResolver{
    constructor(
        private readonly imageService: ImageService,
    ){}
    
    // 이미지 데이터 추가
    // 타투 아이디와 이미지 url 목록을 받아와서 이미지 테이블에 추가 
    @Mutation( ()=> [ String ] )
    async addImgUrl(
        @Args('tattooId') tattooId: string,
        @Args( { name: 'urls', type: () => [ String ] } ) urls: string[]
    ){
        return await this.imageService.add({ tattooId , urls })
    }


    // 이미지 데이터 업데이트
    @Mutation( () => [String] )
    async updateImgUrl(
        @Args('tattooId') tattooId: string,
        @Args( { name: 'urls', type:()=> [ String ] } ) urls: string[]
    ){
        return await this.imageService.update({ tattooId, urls })
    }
    
}