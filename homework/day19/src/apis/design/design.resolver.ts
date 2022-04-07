import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Design } from "./entities/design.entity";
import { DesignService } from "./design.service";

@Resolver()
export class DesignResolver{
    // 서비스를 주입받는다!
    constructor(private readonly designService: DesignService,){

    }


    // 디자인 등록
    @Mutation(()=> Design) 
    createDesign( 
        @Args("name") name_design: string,
        ){
        return this.designService.create( { name_design } )
    }
}