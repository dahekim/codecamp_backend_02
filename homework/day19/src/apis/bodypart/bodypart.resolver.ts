import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { BodypartService, } from "../bodypart/bodypart.service";
import { Bodypart } from "./entities/bodypart.entity";

@Resolver()
export class BodypartResolver{
    // 서비스를 주입받는다!
    constructor(private readonly bodypartService: BodypartService,){

    }



    @Mutation(()=> Bodypart)
    createBodypart( 
        @Args("name") name_part: string, 
        ){
        return this.bodypartService.create( { name_part } )
    }
}