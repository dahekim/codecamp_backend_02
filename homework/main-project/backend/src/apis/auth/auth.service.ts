import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  
  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email_user, sub: user.id_user },
      { secret: 'myRefreshToken', expiresIn: '2w' },
    );
    // ๊ฐ๋ฐํ๊ฒฝ
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    console.log ("๐ช refreshToken ์๋๋ค๐ช " )
    console.log(refreshToken);
    console.log ("๐ช refreshToken ์๋๋ค๐ช " )

    // ๋ฐฐํฌํ๊ฒฝ
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    // 'Set-Cookie',
    // `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`    //
    // )
  }

  // resolver์ user๋ฅผ ๋ฐ์์จ๋ค.
  getAccessToken({ user }) {
    return this.jwtService.sign(
      // ์ด๋ฉ์ผ๊ณผ id
      { email_user: user.email, sub: user.id },
      // ๋น๋ฐ๋ฒํธ, 1์๊ฐ ๋ค์ ํ๊ธฐ
      { secret: 'myAccessToken', expiresIn: '1h' },
    );
  }

  async socialLogin(req, res) {
    let user = await this.userService.findOne({
      email_user: req.user.email_user,
    });
    if (!user) {
      user = await this.userService.create({
        email_user: req.user.email_user,
        hashedPassword: req.user.password,
        nickname_user: req.user.nickname_user,
        birth_user: req.user.birth_user,
      });
    }
    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/homework/main-project/frontend/login/index.html',
    );
  }
}
