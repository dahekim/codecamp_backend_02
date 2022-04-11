import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { BodypartService, } from "../bodypart/bodypart.service";
import { Bodypart } from "./entities/bodypart.entity";

@Resolver()
export class BodypartResolver{
    constructor(private readonly bodypartService: BodypartService,){
    }

    @Mutation(()=> Bodypart)
    createBodypart( 
        @Args("name") name_part: string, 
        @Args("size") size: string,
        ){
        return this.bodypartService.create( { name_part,size } )
    }
}