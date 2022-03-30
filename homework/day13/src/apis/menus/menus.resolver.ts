import { Query, Resolver, Mutation, Args, ObjectType } from '@nestjs/graphql';
import { MenuService } from './menus.service';
import { CreateMenuInput } from './dto/createMenu.input';
import { Menu } from './entities/menu.entity';

@Resolver()
@ObjectType()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query(() => [Menu])
  fetchBoards() {
    return this.menuService.findAll();
  }

  @Mutation(() => String)
  // writer를 받아와서 'writer'로 쓸건데 그 타입은 string이다
  createMenu(
    @Args('createMenuInput') CreateMenuInput: CreateMenuInput,
  ) {

    console.log(CreateMenuInput);

    // boards.service.ts의 create()의 return 타입이 String인것을 보여주기
    return this.menuService.create();
  }
}
