import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Review } from 'src/apis/review/entities/review.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id_user: string;

  @Column({ unique: true, nullable: false })
  @Field(() => String)
  nickname_user: string;

  @Column()
  @Field(() => Date)
  birth_user: Date;

  @Column({ unique: true, nullable: false })
  @Field(() => String)
  email_user: string;

  @Column({ unique: true, nullable: true })
  @Field(() => String)
  phone_user: string;

  @Column({ nullable: false })
  // @Field(()=> String)
  password: string;

  @Column({ nullable: true })
  @Field(() => String)
  desc_user: string;

  @Column({ default: false })
  @Field(() => Boolean)
  type_user: boolean;
  //  true일 경우 타투이스트, false일 경우 일반 고객

  // N:M
  // 1. 유저 - 리뷰 테이블 (도안에 주는 리뷰가 아니라 타투이스트(회원)에게 주는 리뷰)
  @JoinTable()
  @ManyToMany(() => Review, (reviews) => reviews.users)
  @Field(() => [Review])
  reviews: Review[];

  @Column({default:0})
  @Field(()=>Int)
  point:number
}
