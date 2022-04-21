import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  // 1. 검증, 검증이 되지 않으면 에러 반환
  constructor() {
    super({
      // 헤더에서 Bearer Token만 추출
      // auth.service.ts/getAccessToken() 에서 secret 값으로 입력했던 내용 넣음
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessToken',
      passReqTocCallback: true,
    })
  }

  // 2. 검증 완료 시 validate 실행, 이메일과 id(sub으로 설정했던 것)를 payload로 넘겨줌
  validate(payload) {
    console.log(payload);
    return {
      email_user: payload.email,
      id_user: payload.sub,
    };
  }
}
