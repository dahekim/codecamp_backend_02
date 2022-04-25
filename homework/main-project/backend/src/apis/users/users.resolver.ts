import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './users.service';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt'
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

// 회원생성
  @Mutation(() => Users)
  async createUser(
    @Args('email') email_user: string,
    @Args('password') password: string,
    @Args('nickname') nickname_user: string,
    @Args('birth') birth_user: number,
  )
  {
    const hashedPassword = await bcrypt.hash(password, 10).then(res => res)
    return this.userService.create({ 
      nickname_user, 
      birth_user, 
      email_user, 
      hashedPassword, 
    })
  }

  // 회원정보 조회
  @UseGuards(GqlAuthAccessGuard)
  @Query( () => Users )
  async fetchUser(
    @CurrentUser() currentUser : ICurrentUser,
  ){
    console.log("회원조회가 완료되었습니다.")
    return await this.userService.findOne ({ email_user : currentUser.email_user  })
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query( () => Users)
  async fetchUsers(){
    return await this.userService.findAll();
  }

  // 비밀번호 변경
  @UseGuards(GqlAuthAccessGuard)
  @Query( () => Users )
  async updatePassword(
    @Args('password') password: string,
    @CurrentUser() currentUser: ICurrentUser,
  ){
    console.log("비밀번호가 변경되었습니다.")
    await this.userService.update( {password, email_user : currentUser.email_user } )
    return await this.userService
  }

  // 유저 삭제
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(()=> Boolean)
  async deleteUser(
    @CurrentUser() currentUser:ICurrentUser,
    ){
      console.log("회원삭제가 완료되었습니다.")
      return await this.userService.delete({email_user : currentUser.email_user})
    }

  // @Mutation(() => Users)
  // createLocation(@Args('nickname_user') nickname_user: string) {
  //   return this.userService.create({ nickname_user });
  // }
}
