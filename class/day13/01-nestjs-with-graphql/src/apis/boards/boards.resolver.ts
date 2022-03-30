import { Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';

@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => String) // 리턴 타입 지정
    getHello(): string {
        return this.boardService.aaa();
    }
}
