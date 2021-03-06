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
    // π¦ μΊμ λ±λ‘, μ‘°ν μ°μ΅
    // μΊμμ key-value ννλ‘ μ μ₯ (key-value store)
    await this.cacheManager.set("bbb", CreateBoardInput, {
      ttl: 0,
    })
    // μΊμμ "aaa" μ°Ύμμ€~ 
    const mycache = await this.cacheManager.get("bbb")
    console.log(mycache)
    return "π¦π¦μ§κΈμ μΊμ νμ€νΈμ€μλλ€~"
    // π¦ μΊμ λ±λ‘, μ‘°ν μ°μ΅ λ~ 


    // λ λμ€ μ°μ΅μ μν΄μ μ£Όμ μ²λ¦¬ 
    // console.log(title);
    // console.log(writer);
    // console.log(contents);
    // console.log(CreateBoardInput);    
    //return this.boardService.create();
  }
}
