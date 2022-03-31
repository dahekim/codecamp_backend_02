import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Starbucks가 클래스이지만 테이블이라는 것을 알려줘야 하기 때문에 starbucks.entity.ts에 @로 Entity인 것 명시
// 테이블로도 쓰이고 graphql 타입이라는 것도 쓰이고
// 이래야 리졸버에서 정상적으로 작동한다
// 스키마에서 보드라는 타입이 자동으로 생성됨

@Entity()
@ObjectType()
export class Starbucks {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Int)
  kcal: number;

  @Column()
  @Field(() => Int)
  fats: number;

  @Column()
  @Field(() => Int)
  protein: number;

  @Column()
  @Field(() => Int)
  Na: number;

  @Column()
  @Field(() => Int)
  sugars: number;

  @Column()
  @Field(() => Int)
  caffeine: number;
}
