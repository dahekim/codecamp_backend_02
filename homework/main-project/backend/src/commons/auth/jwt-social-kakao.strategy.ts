import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-kakao"

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy( Strategy, 'kakao') {
    // 네이버에서 인증 및 검증이 모두 되기 때문에 클라이언트 아이디 입력하기
    constructor(){
        super ({
            clientID: process.env.OAUTH_KAKAO_ID,
            callbackURL: process.env.OAUTH_KAKAO_CALLBACK,
        })
    }

    // 2. 검증 완료 시 validate 실행, accessToken/refreshToken/profile 받아온다~
    validate( accessToken: string, refreshToken: string, profile: any ){

        return {
            email_user: profile._json.kakao_account.email,
            password: "qwer1234",
            nickname_user: "ㅇ아아아",
            birth_user: "2010-03-15",
        }
    }
}