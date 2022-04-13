import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    // 모든 인증은 다 구글에서 이뤄지고 검증되기 때문에 클라이언트 아이디 입력하기
    // 개발자 사이트에서 아래에 어떤거 적어야 하는지 확인하기...(여긴 구글 기준)
    constructor(){
        super ({
            clientID: '입력하기', // <받아온 클라이언트 아이디 여기에 넣기 (이하동일)
            clientSecret: '입력하기', 
            clientURL: '입력하기',
            scope: ['email', 'profile']
        })
    }

    // 2. 검증 완료 시 validate 실행, accessToken/refreshToken/profile 받아온다~
    validate( accessToken: string, refreshToken: string, profile: any ){
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)

        return {
            email: profile.emails[0].value,
            password: "qwer1234",
            name: profile.displayName,
            age: 0,
        }
    }
}