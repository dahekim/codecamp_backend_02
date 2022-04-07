import { Field, InputType, Int } from "@nestjs/graphql";
import { Design } from "src/apis/design/entities/design.entity";
import { Method } from "src/apis/method/entities/method.entity";

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

    // 1:1 - 작업방식
    @Field(() => Method)
    method: Method

    // 1:1 - 도안
    @Field(() => Design)
    design: Design

    // 1:N - 지역
    @Field(() =>String)
    id_location: string

    // 1:N - 타투 새길 부위 
    @Field(() =>String)
    id_part: string

    // 1:N - 유저
    @Field(() => String)
    id_user: string

    // 1:N - 타투 장르
    @Field(() => String)
    id_genre: string

    // 1:N - 타투 종류
    @Field(()=> String)
    id_type : string
    
}