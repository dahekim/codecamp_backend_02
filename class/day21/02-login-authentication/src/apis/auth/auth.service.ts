import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ){}

    // resolver의 user를 받아온다~ 
    getAccessToken(user){
        return this.jwtService.sign(
            // 저장하고 싶은 데이터를 중괄호
            // 다른 사람들도 다 볼 수 있기 때문에 너무 많은 정보를 넣는 것은 추천하지 않음!
            { email: user.email, sub : user.id },

            // 비밀번호, 나중엔 복잡하게 적자 😉
            // 기간 제한 없는 토큰이라면?? 만약에 누가 훔쳐간다면??? 😱 
            // 그러면 안되니까 만료시간은 짧게 준다~ 
            { secret: 'myAccessToken' , expiresIn: '1h'}
        )
    }
}