import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
    @Field(() => String)
    name: string;

    @Field(() => Number)
    price: number;

    @Field(() => Number)
    kcal: number;

    @Field(() => Number)
    fat: number;

    @Field(() => Number)
    protein: number;

    @Field(() => Number)
    Na: number;

    @Field(() => Number)
    sugars: number;

    @Field(() => Number)
    caffein: number;
}
