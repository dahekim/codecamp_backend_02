import { Cache } from 'cache-manager'
import 
{ 
  CACHE_MANAGER, 
  Inject, 
  UnauthorizedException, 
  UnprocessableEntityException, 
  UseGuards 
} from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param'
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { AuthService } from './auth.service'
import { UserService } from '../users/users.service'
import { getToday } from 'src/commons/libraries/utils'
// import { auth } from 'google-auth-library'


@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email_user') email_user: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    // 1. 로그인 ( (Args로 받아온) 이메일과 비밀번호가 일치하는 유저를 DB에서 찾기)
    const user = await this.userService.findOne({ email_user });

    // 2-1. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException("존재하지 않는 이메일입니다.");

    // 2-2. 일치하는 유저가 있지만 암호가 틀렸다면 에러 던지기
    // DB에 있는 비밀번호가 Hashing 상태이기 때문에 비교할 password(로그인 시 입력한 비밀번호)도
    // Hashing으로 암호화해서 비교 ( bcrypt.compare() )

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException("비밀번호가 일치하지 않습니다.");
    
    // 2-3. 일치하는 유저가 있다면 그 유저를 위한 Access Token(=JWT) 만들어서 프론트엔드에 전달
    // refreshToken(cookie)를 헤더에 담아서 전달 
    this.authService.setRefreshToken({ user, res: context.res })
    return this.authService.getAccessToken({ user });
  }
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String )
  async logout(@Context() context : any) {
    const accessToken = await context.req.headers.authorization.split(" ")[1]
    const refreshToken = await context.req.headers.cookie.replace("refreshToken=", "")
    // console.log(accessToken)
    // console.log(refreshToken)

    // 검증 
    const authAt = jwt.verify(accessToken, "myAccessToken" )
    const authRt = jwt.verify(refreshToken, "myRefreshToken")

    const present = Date.parse(getToday()) / 1000

    try{
      await this.cacheManager.set( `accessToken:${accessToken}`, accessToken, {
        ttl: typeof authAt === 'object' ? authAt.exp - present : -1 } )
      await this.cacheManager.set( `refreshToken:${refreshToken}`, refreshToken, {
        ttl: typeof authRt === 'object' ? authRt.exp - present : -1 } )
    } catch (error){
      if (error?.response?.data?.message){
        throw new UnauthorizedException("❌ 토큰값이 일치하지 않습니다.")
      } else {
        throw error
      }
    }
    return "⭕️ 로그아웃 성공!"
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: ICurrentUser) {
    this.authService.getAccessToken({ user: currentUser });
  }
}
