import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request,Response } from 'express'
import { User } from "../users/entities/user.entity";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";


interface IOAuthUser{
    user: Pick<User, 'email'| 'password'| 'name'| 'age'>
}


@Controller()
export class AuthController{
    constructor(
        private readonly userService : UserService,
        private readonly authService: AuthService,
    ){}

    // 로그인 사이트 여기야~ (/login/google)
    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async loginGoogle(
        @Req() req: Request& IOAuthUser,
        @Res() res: Response,
    ) {
        req.user.email
        // 1. 가입확인
        // 유저서비스에 해당 이메일이 있/없 확인, 위에 유저서비스 주입하기
        let user = await this.userService.findOne({email:req.user.email})
        // 2. 회원가입
        // 위 결과를 거쳤는데 유저가 아니라면 회원가입 시켜버려
        if(!user){
            user = await this.userService.create({
                email: req.user.email,
                hashedPassword: req.user.password,
                name: req.user.name,
                age: req.user.age,
            }) 
        }
        // 3. 로그인
        // AuthService에서 refreshToken을 만들어서 FE에 전달
        this.authService.setRefreshToken({user, res})

        // 브라우저 페이지를 리다이렉트, 안에 적힌 주소로 연결됨
        res.redirect(
            "http://localhost:5500/class/day22/03-login-google/frontend/social-login.html"
        )
        // 쿠키에 refreshToken 있으면 로그인 성공~! 
    }
}