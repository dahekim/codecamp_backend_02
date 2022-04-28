import { Query, Resolver, Mutation, Args, ObjectType } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

import { Cache } from 'cache-manager'
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
@ObjectType()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
    ) {}

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('title') title: string,
    // @Args('writer') writer: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput') CreateBoardInput: CreateBoardInput,
  ) {
    // 🚦 캐시 등록, 조회 연습
    // 캐시에 key-value 형태로 저장 (key-value store)
    await this.cacheManager.set("bbb", CreateBoardInput, {
      ttl: 0,
    })
    // 캐시에 "aaa" 찾아줘~ 
    const mycache = await this.cacheManager.get("bbb")
    console.log(mycache)
    return "🚦🚦지금은 캐시 테스트중입니다~"
    // 🚦 캐시 등록, 조회 연습 끝~ 


    // 레디스 연습을 위해서 주석 처리 
    // console.log(title);
    // console.log(writer);
    // console.log(contents);
    // console.log(CreateBoardInput);    
    //return this.boardService.create();
  }
}
