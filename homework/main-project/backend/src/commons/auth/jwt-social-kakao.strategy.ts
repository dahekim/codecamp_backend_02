import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-kakao"

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy( Strategy, 'kakao') {
    // 네이버에서 인증 및 검증이 모두 되기 때문에 클라이언트 아이디 입력하기
    constructor(){
        super ({
            clientID: '71af1bae21fd6c8ffa822e9a13e80603',
            callbackURL: 'http://localhost:3000/login/kakao',
        })
    }

    // 2. 검증 완료 시 validate 실행, accessToken/refreshToken/profile 받아온다~
    validate( accessToken: string, refreshToken: string, profile: any ){
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)

        return {
            email_user: profile.email,
            password: "qwer1234",
            nickname_user: profile.displayName,
            birth_user: "2020-03-15",
        }
    }
}