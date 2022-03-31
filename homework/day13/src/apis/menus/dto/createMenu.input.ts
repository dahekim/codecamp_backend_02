import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStarbucksInput {
    @Field(() => String)
    name: string;

    @Field(() => Number)
    price: number;

    @Field(() => Number)
    kcal: number;

    @Field(() => Number)
    fats: number;

    @Field(() => Number)
    protein: number;

    @Field(() => Number)
    Na: number;

    @Field(() => Number)
    sugars: number;

    @Field(() => Number)
    caffeine: number;
}
