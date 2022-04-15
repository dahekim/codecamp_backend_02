import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-google-oauth20";

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    // 모든 인증은 다 구글에서 이뤄지고 검증되기 때문에 클라이언트 아이디 입력하기
    constructor(){
        super ({
            clientID: process.env.OAUTH_GOOGLE_ID,
            clientSecret: process.env.OAUTH_GOOGLE_SECRET, 
            callbackURL: process.env.OAUTH_GOOGLE_CALLBACK,
            scope: ['email', 'profile']
        })
    }

    // 2. 검증 완료 시 validate 실행, accessToken/refreshToken/profile 받아온다~
    validate( accessToken: string, refreshToken: string, profile: any ){
        // console.log(accessToken)
        // console.log(refreshToken)
        // console.log(profile.email)

        return {
            email_user: profile.emails[0].value,
            password: "qwer12345",
            nickname_user: profile.displayName,
            birth_user: "2019-03-15",
        }
    }
}