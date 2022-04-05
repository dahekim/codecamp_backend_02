import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateTattooInput } from "./dto/createTattoo.input";
import { Tattoo } from "./entities/tattoo.entity";
import { TattooService } from "./tattoo.service";

@Resolver()
export class TattooResolver{
    constructor(private readonly tattooService: TattooService,) { }
    // 타투 전체 목록 조회
    @Query(() => [Tattoo])
    fetchTattoos(){
        return this.tattooService.findAll()
    }

    // 타투 하나 정보 조회
    @Query(() => Tattoo)
    fetchTattoo(
        @Args('tattooId') tattooId: string,
    ){
        return this.tattooService.findOne({ tattooId })
    }

    // 타투 데이터 생성
    @Mutation( () =>Tattoo )
    createTattoo(
        @Args('createTattooInput') createTattooInput: CreateTattooInput,
    ) {  
        return this.tattooService.create( {createTattooInput} )
    }

}