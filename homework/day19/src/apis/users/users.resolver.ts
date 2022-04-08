import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "./users.service";
import { Users } from "./entities/users.entity";

@Resolver()
export class UserResolver{

    constructor(private readonly userService: UserService,){

    }
    @Mutation(()=> Users ) 
    createLocation( 
        @Args("nickname_user") nickname_user: string,
        ){

        return this.userService.create( { nickname_user } )
        
    }
}