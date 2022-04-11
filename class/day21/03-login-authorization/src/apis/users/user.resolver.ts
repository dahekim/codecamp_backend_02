import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt'

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport'
import { GqlAccessGuard } from "src/commons/auth/gql-auth.guard";
import { CurrentUser } from "src/commons/auth/gql-user.param";

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
    // Graphql에서 한 부분 가로막고 있는 단계가 있다! 

    @UseGuards(GqlAccessGuard)
    @Query(()=> String)
    fetchUser(
        // CurrentUser를 currentUser 받음
        @CurrentUser() currentUser: any,
    ){
        console.log(currentUser)
        console.log("fetchUser 실행 완료! ")
    }
}