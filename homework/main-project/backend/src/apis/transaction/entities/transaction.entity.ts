import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Users } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

export enum TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}
// graphql에서 enum을 쓸 수 있도록 등록
registerEnumType(TRANSACTION_STATUS_ENUM, {
  name: 'TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => String)
  tattooId: string;

  @Column()
  @Field(() => Int)
  amount: number;

  // enum 타입의 컬럼, TRANSACTION_STATUS_ENUM 형태로 들어간다고 명시
  @Column({ type: 'enum', enum: TRANSACTION_STATUS_ENUM })
  @Field(() => TRANSACTION_STATUS_ENUM)
  status: string;

  // 유저 한 명(1)이 여러 번의 결제(n)
  @ManyToOne(() => Users)
  @Field(() => Users)
  user: Users;

  // 따로 입력하지 않아도 자동으로 날짜 생성
  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
