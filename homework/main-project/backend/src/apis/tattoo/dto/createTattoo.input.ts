import { Field, InputType, Int } from '@nestjs/graphql';
import { DesignInput } from 'src/apis/design/dto/design.input';
import { MethodInput } from 'src/apis/method/dto/method.input';
@InputType()
export class CreateTattooInput {
  @Field(() => String)
  name_tattoo: string;

  @Field(() => Date)
  date_tattoo: Date;

  @Field(() => String)
  desc_tattoo: string;

  @Field(() => Int)
  count_tattoo: number;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  payment: string;

  // 1:1 - 작업방식
  @Field(() => MethodInput)
  method: MethodInput;

  // 1:1 - 도안
  @Field(() => DesignInput)
  design: DesignInput;

  // 1:N - 지역
  @Field(() => String)
  id_location: string;

  // 1:N - 타투 새길 부위
  @Field(() => String)
  id_part: string;

  // 1:N - 유저
  @Field(() => String)
  id_user: string;

  // 1:N - 타투 장르
  @Field(() => String)
  id_genre: string;

  // 1:N - 타투 종류
  @Field(() => String)
  id_type: string;

  // N:M - 타투 태그
  @Field(() => [String])
  tattooTags: string[];
}
