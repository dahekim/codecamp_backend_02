import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './users.service';
import { Users } from './entities/users.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

//   @Mutation(() => Users)
//   createLocation(@Args('nickname_user') nickname_user: string) {
//     return this.userService.create({ nickname_user });
//   }

  @Mutation(() => Users)
  createUser(
    @Args('email') email_user: string,
    @Args('password') password: string,
    @Args('nickname') nickname_user: string,
    @Args('birth') birth_user: number,
    @Args('descripton') desc_user: string,
  )
  {
      return this.userService.create({ 
        nickname_user, 
        birth_user, email_user, password, desc_user, })
  }
}
