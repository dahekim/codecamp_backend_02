import { UnprocessableEntityException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "../users/users.service"
import * as bcrypt from "bcrypt"
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly userService: UserService ,
        private readonly authService: AuthService
    ){}

    @Mutation( () => String )
    async login(
        @Args('email_user') email_user : string, 
        @Args('password') password: string,
    ){
        // 1. 로그인 ( (Args로 받아온) 이메일과 비밀번호가 일치하는 유저를 DB에서 찾기) 
        const user = await this.userService.findOne( { email_user } )

        // 2-1. 일치하는 유저가 없으면 에러 던지기
        if(!user) throw new UnprocessableEntityException("존재하지 않는 이메일입니다.")
        
        // 2-2. 일치하는 유저가 있지만 암호가 틀렸다면 에러 던지기
        // DB에 있는 비밀번호가 Hashing 상태이기 때문에 비교할 password(로그인 시 입력한 비밀번호)도
        // Hashing으로 암호화해서 비교 ( bcrypt.compare() )

        const isAuth = await bcrypt.compare(password, user.password)
        if(!isAuth) throw new UnprocessableEntityException("비밀번호가 일치하지 않습니다.")

        // 2-3. 일치하는 유저가 있다면 그 유저를 위한 Access Token(=JWT) 만들어서 프론트엔드에 전달
        return this.authService.getAccessToken({ user })


    }
}