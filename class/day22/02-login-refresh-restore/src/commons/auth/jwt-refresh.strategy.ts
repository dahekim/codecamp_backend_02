import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(){
        super ({
            jwtFromRequest : (req) => req.headers.cookie.replace("refreshToken=", ""),
            secretOrKey : 'myRefreshToken',
        })
    }

    validate( payload ){
        console.log(payload)
        return {
            email: payload.email,
            id: payload.sub
        }
    }
}