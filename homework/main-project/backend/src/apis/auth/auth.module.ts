import { Module } from '@nestjs/common'
import { UserService } from '../users/users.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from '../users/entities/users.entity'
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy'
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy'
import { AuthController } from './auth.controller'
import { JwtNaverStrategy } from 'src/commons/auth/jwt-social-naver.strategy'
import { JwtKakaoStrategy } from 'src/commons/auth/jwt-social-kakao.strategy'

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Users])],
  providers: [
    JwtKakaoStrategy,
    JwtNaverStrategy,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    AuthResolver,
    AuthService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
