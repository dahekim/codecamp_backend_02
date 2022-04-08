import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver{
    constructor(

        // UserService Import
        private readonly userService: UserService, 
    ){}
    
    @Mutation(()=> User)
    createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('name') name: string,
        @Args('age') age: number,
    ){
        // 프론트에서 받은 이메일 패스워드를 () 안에 넣어서 service로 보내준다
        return this.userService.create({email, password, name, age})
        
    }

}
