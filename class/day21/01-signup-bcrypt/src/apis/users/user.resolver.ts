import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt'

@Resolver()
export class UserResolver{
    constructor(

        // UserService Import
        private readonly userService: UserService, 
    ){}
    
    @Mutation(()=> User)
    async createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('name') name: string,
        @Args('age') age: number,
    ){
        // service로 비밀번호를 넘길 때 hashing된 비밀번호로 넘기자!
        // hash가 될 때 까지 기다렸다가 넘겨주자~
        const hashedPassword = await bcrypt.hash(password, 10).then( res => res )        
        return this.userService.create({email, hashedPassword, name, age})
    }
}