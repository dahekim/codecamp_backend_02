import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

// Board가 클래스이지만 테이블이라는 것을 알려줘야 하기 때문에 board.entity.ts에 @로 Entity인 것 명시
// 테이블로도 쓰이고 graphql 타입이라는 것도 쓰이고
// 이래야 리졸버에서 정상적으로 작동한다
// 스키마에서 보드라는 타입이 자동으로 생성됨

@Entity()
@ObjectType()
export class Menu {
    @Field(() => String)
    name: string;

    @Field(() => Int)
    price: number;

    @Field(() => Int)
    kcal: number;

    @Field(() => Int)
    fat: number;

    @Field(() => Int)
    protein: number;

    @Field(() => Int)
    Na: number;

    @Field(() => Int)
    sugars: number;

    @Field(() => Int)
    caffein: number;
}
