import { Mutation } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
//@ObjectType()
// Board가 class 처럼 보이지만 graphql의 객체타입이야
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => [Board])
    fetchBoards() {
        return this.boardService.findAll();
    }

    @Mutation(() => String)
    // writer를 받아와서 'writer'로 쓸건데 그 타입은 string이다
    createBoard(
        @Args('title') title: string,
        @Args('writer') writer: string,
        @Args('contents') contents: string,

        @Args('createBoardInput') createBoard: CreateBoardInput,
    ) {
        console.log(title);
        console.log(writer);
        console.log(contents);
        console.log(CreateBoardInput);

        // boards.service.ts의 create()의 return 타입이 String인것을 보여주기
        return this.boardService.create();
    }
}
