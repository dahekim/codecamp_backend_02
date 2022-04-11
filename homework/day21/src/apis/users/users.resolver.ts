import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './users.service';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt'

import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

//   @Mutation(() => Users)
//   createLocation(@Args('nickname_user') nickname_user: string) {
//     return this.userService.create({ nickname_user });
//   }

  @Mutation(() => Users)
  async createUser(
    @Args('email') email_user: string,
    @Args('password') password: string,
    @Args('nickname') nickname_user: string,
    @Args('birth') birth_user: number,
    @Args('description') desc_user: string,
  )
  {
    const hashedPassword = await bcrypt.hash(password, 10).then(res => res)
    return this.userService.create({ 
      nickname_user, 
      birth_user, email_user, hashedPassword, desc_user, })
  }

  // 회원정보 조회
  @UseGuards(GqlAuthAccessGuard)
  @Query( () => String )
  fetchUser(
    @CurrentUser() currentUser : any,
  ){
    console.log(currentUser)
    console.log("회원조회가 완료되었습니다.")
  }

  // 비밀번호 변경
  @UseGuards(GqlAuthAccessGuard)
  @Query( () => Users )
  async updateUser(
    @Args('password') password: string,
    @CurrentUser() currentUser: any,
  ){
    await this.userService.update( {password, email_user : currentUser.email} )
    return await this.userService
    console.log("비밀번호가 변경되었습니다.")
  }
}
