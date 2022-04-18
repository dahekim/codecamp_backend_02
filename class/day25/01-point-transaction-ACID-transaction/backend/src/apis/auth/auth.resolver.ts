import { UnprocessableEntityException, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "../users/user.service";
import * as bcrypt from "bcrypt"
import { AuthService } from "./auth.service";
import { CurrentUser, ICurrentUser } from "src/commons/auth/gql-user.param";
import { GqlAuthRefreshGuard } from "src/commons/auth/gql-auth.guard";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly userService: UserService ,
        private readonly authService: AuthService
    ){}

    @Mutation( () => String )
    async login(
        @Args('email') email : string, 
        @Args('password') password: string,
        @Context() context: any,
    ){
        // 1. 로그인 ( (Args로 받아온) 이메일과 비밀번호가 일치하는 유저를 DB에서 찾기) 
        const user = await this.userService.findOne( { email } )

        // 2-1. 일치하는 유저가 없으면 에러 던지기
        if(!user) throw new UnprocessableEntityException("존재하지 않는 이메일입니다.")
                // 2-2. 일치하는 유저가 있지만 암호가틀렸다면 에러 던지기
        // DB에 있는 비밀번호가 Hashing 상태이기 때문에 비교할 password(로그인 시 입력한 비밀번호)도
        // Hashing으로 암호화해서 비교 ( bcrypt.compare() )
        // return이 promise이기 때문에 await 걸어준다 
        const isAuth = await bcrypt.compare(password, user.password)
        if(!isAuth) throw new UnprocessableEntityException("비밀번호가 일치하지 않습니다.")

        // 2-3. refreshToken(=JWT) 만들어서 프론트엔드(cookie)에 전달
        // 이때, response header에 refreshToken을 넣어서 보내주는 것,  
        this.authService.setRefreshToken( { user, res:context.res } )
        console.log(context)
        
        // 2-4. 일치하는 유저가 있다면 그 유저를 위한 Access Token(=JWT) 만들어서 프론트엔드에 전달
        // 토큰 어디서 만들어? 서비스에서 빼놓고 필요할 때마다 가져다 쓰자!
        
        // +브라우저의 쿠키에다가 위에서 만든 refreshToken을 저장해준다~
        return this.authService.getAccessToken({user})
        

        // service.ts에서 받은 token은 string 타입~ 
    }

    @UseGuards(GqlAuthRefreshGuard)
    @Mutation(()=> String)
    restoreAccessToken(
        @CurrentUser() currentUser: ICurrentUser
    ){
        return this.authService.getAccessToken( { user: currentUser} )
    }
}