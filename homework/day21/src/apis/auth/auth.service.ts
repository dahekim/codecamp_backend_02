import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ){}

    // resolver의 user를 받아온다~ 
    getAccessToken( { user } ){
        return this.jwtService.sign(
            // 이메일과 id
            { email_user: user.email, sub : user.id },

            // 비밀번호, 1시간 뒤에 파기
            { secret: 'myAccessToken' , expiresIn: '1h'}
        )
    }
}