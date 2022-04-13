import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request,Response } from 'express'
import { Users } from "../users/entities/users.entity";
import { UserService } from "../users/users.service"
import { AuthService } from "./auth.service";


interface IOAuthUser{
    user: Pick <Users, 'email_user'| 'password' | 'nickname_user'| 'birth_user'>
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
        @Req() req: Request & IOAuthUser,
        @Res() res: Response,
    ) {
        req.user.email_user
        // 1. 가입확인
        // 유저서비스에 해당 이메일이 있/없 확인, 위에 유저서비스 주입하기
        let user = await this.userService.findOne({email_user : req.user.email_user})
        // 2. 회원가입
        // 위 결과를 거쳤는데 유저가 아니라면 회원가입 시켜버려
        if(!user){
            user = await this.userService.create({
                email_user: req.user.email_user,
                hashedPassword: req.user.password,
                nickname_user: req.user.nickname_user,
                birth_user: req.user.birth_user,
            }) 
        }
        // 3. 로그인
        // AuthService에서 refreshToken을 만들어서 FE에 전달
        this.authService.setRefreshToken({ user, res })

        // 브라우저 페이지를 리다이렉트, 안에 적힌 주소로 연결됨
        res.redirect(
            "http://127.0.0.1:5500/homework/main-project/frontend/login/index.html"
        )
        // 쿠키에 refreshToken 있으면 로그인 성공~! 
    }

    // 로그인 사이트 (/login/naver)
    @Get('/login/naver')
    @UseGuards(AuthGuard('naver'))
    async loginNaver(
        @Req() req: Request & IOAuthUser,
        @Res() res: Response,
    ) {
        // console.log(req.user.email_user)
        //req.user.email_user

        // 1. 가입확인
        let user = await this.userService.findOne({email_user : req.user.email_user})
        //console.log(user)
        // 2. 회원가입 - 유저가 아니라면 회원가입
        if(!user){
            user = await this.userService.create({
                email_user: req.user.email_user,
                hashedPassword: req.user.password,
                nickname_user: req.user.nickname_user,
                birth_user: req.user.birth_user,
            }) 
        }
        // 3. 로그인
        // AuthService에서 refreshToken을 만들어서 FE에 전달
        this.authService.setRefreshToken({ user, res })

        // 브라우저 페이지를 리다이렉트, 안에 적힌 주소로 연결됨
        res.redirect(
            "http://127.0.0.1:5500/homework/main-project/frontend/login/index.html"
        )
    }

    // 로그인 사이트 (/login/kakao)
    @Get('/login/kakao')
    @UseGuards(AuthGuard('kakao'))
    async loginKakao(
        @Req() req: Request & IOAuthUser,
        @Res() res: Response,
    ) {

        // 1. 가입확인
        let user = await this.userService.findOne({email_user : req.user.email_user})
        

        // 2. 회원가입 - 유저가 아니라면 회원가입
        if(!user){
            user = await this.userService.create({
                email_user: req.user.email_user,
                hashedPassword: req.user.password,
                nickname_user: req.user.nickname_user,
                birth_user: req.user.birth_user,
            }) 
        }
        // 3. 로그인
        // AuthService에서 refreshToken을 만들어서 FE에 전달
        this.authService.setRefreshToken({ user, res })

        // 브라우저 페이지를 리다이렉트, 안에 적힌 주소로 연결됨
        res.redirect(
            "http://127.0.0.1:5500/homework/main-project/frontend/login/index.html"
        )
    }
}