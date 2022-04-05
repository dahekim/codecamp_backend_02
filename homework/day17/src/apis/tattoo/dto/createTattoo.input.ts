import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateTattooInput{
    @Field(() => String)
    name_tattoo: string

    @Field(() => String)
    date_tattoo: string

    @Field(()=> String)
    desc_tattoo: string

    @Field(()=> Int)
    count_tattoo: number

    @Field(() => Int)
    price : number 

    @Field(()=> String)
    payment : string
}