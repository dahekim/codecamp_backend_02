import { Query, Resolver, Mutation, Args, ObjectType } from '@nestjs/graphql';
import { StarbucksService } from './menus.service';
import { CreateStarbucksInput } from './dto/createMenu.input';
import { Starbucks } from './entities/menu.entity';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarbucksService) {}

  @Query(() => [Starbucks])
  fetchStarbucks() {
    return this.starbucksService.findAll();
  }

  @Mutation(() => String)
  // writer를 받아와서 'writer'로 쓸건데 그 타입은 string이다
  createStarbucks(
    @Args('createStarbucksInput') CreateStarbucksInput: CreateStarbucksInput,
  ) {
    console.log(CreateStarbucksInput);

    // Starbucks.service.ts의 create()의 return 타입이 String인것을 보여주기
    return this.starbucksService.create();
  }
}
