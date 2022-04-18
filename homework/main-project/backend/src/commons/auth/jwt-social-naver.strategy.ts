import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  // 네이버에서 인증 및 검증이 모두 되기 때문에 클라이언트 아이디 입력하기
  constructor() {
    super({
      clientID: process.env.OAUTH_NAVER_ID,
      clientSecret: process.env.OAUTH_NAVER_SECRET,
      callbackURL: process.env.OAUTH_NAVER_CALLBACK,
    });
  }

  // 2. 검증 완료 시 validate 실행, accessToken/refreshToken/profile 받아온다~
  validate(accessToken: string, refreshToken: string, profile: any) {
    // console.log(accessToken)
    // console.log(refreshToken)
    // console.log(profile)

    return {
      email_user: profile.email,
      password: 'qwer1234',
      nickname_user: profile.nickname,
      birth_user: '2020-03-15',
    };
  }
}
