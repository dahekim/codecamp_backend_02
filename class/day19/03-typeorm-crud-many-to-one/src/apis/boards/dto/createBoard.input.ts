import { Field, InputType } from '@nestjs/graphql';

@InputType()
// input type 생성한다고 알려주기
export class CreateBoardInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    writer: string;

    @Field(() => String)
    contents: string;
}
