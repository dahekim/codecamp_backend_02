import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { UserService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
 
    ){}
    setRefreshToken({ user, res }){
        let refreshToken =  this.jwtService.sign(

            { email: user.email_user, sub : user.id_user },
            { secret: 'myRefreshToken' , expiresIn: '2w'},
        )
        // 개발환경
        res.setHeader('Set-Cookie',`refreshToken=${refreshToken}; path=/;`)
        console.log(refreshToken)
        

        // 배포환경
        // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
        // res.setHeader(
        // 'Set-Cookie',
        // `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`    // 
        // )
    }

    // resolver의 user를 받아온다. 
    getAccessToken( { user } ){
        return this.jwtService.sign(
            // 이메일과 id
            { email_user: user.email, sub : user.id },
            // 비밀번호, 1시간 뒤에 파기
            { secret: 'myAccessToken' , expiresIn: '1h'}
        )
    }

    async socialLogin(req, res){
        let user = await this.userService.findOne({email_user : req.user.email_user})
        if(!user){
            user = await this.userService.create({
                email_user: req.user.email_user,
                hashedPassword: req.user.password,
                nickname_user: req.user.nickname_user,
                birth_user: req.user.birth_user,
            }) 
        }
        this.setRefreshToken({ user, res })
        res.redirect(
            "http://localhost:5500/homework/main-project/frontend/login/index.html"
        )
    }
}