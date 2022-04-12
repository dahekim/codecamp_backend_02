import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { TattooType } from "./entities/tattooType.entity";
import { TypeService } from "./type.service";

@Resolver()
export class TypeResolver{

    constructor(private readonly typeService: TypeService ,){

    }
    @Mutation(()=> TattooType ) 
    createType( 
        @Args("name_type") name_type: string,
        ){

        return this.typeService.create( { name_type } )
        
    }
}