import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request,Response } from 'express'
import { Users } from "../users/entities/users.entity";
import { AuthService } from "./auth.service";


interface IOAuthUser{
    user: Pick <Users, 'email_user'| 'password' | 'nickname_user'| 'birth_user'>
}

@Controller()
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    // 로그인 사이트 (/login/google)
    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async loginGoogle(
        @Req() req: Request & IOAuthUser,
        @Res() res: Response,
    ) {
        this.authService.socialLogin(req,res)
    }
    // 로그인 사이트 (/login/naver)
    @Get('/login/naver')
    @UseGuards(AuthGuard('naver'))
    async loginNaver(
        @Req() req: Request & IOAuthUser,
        @Res() res: Response,
    ) {
        this.authService.socialLogin(req,res)
    }

    // 로그인 사이트 (/login/kakao)
    @Get('/login/kakao')
    @UseGuards(AuthGuard('kakao'))
    async loginKakao(
        @Req() req: Request & IOAuthUser,
        @Res() res: Response,
    ) {
        this.authService.socialLogin(req,res)
    }
}