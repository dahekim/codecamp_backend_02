import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql"
import { Users } from "src/apis/users/entities/users.entity"
import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, Entity  } from "typeorm"

export enum POINT_TRANSACTION_STATUS_ENUM{
    PAYMENT='PAYMENT',
    CANCEL = 'CANCEL',
}
// graphql에서 enum을 쓸 수 있도록 등록
registerEnumType( POINT_TRANSACTION_STATUS_ENUM, {
    name: 'POINT_TRANSACTION_STATUS_ENUM',
})

@Entity()
@ObjectType()
export class PointTransaction{
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>String)
    id : string

    @Column()
    @Field(()=>String)
    impUid: string

    @Column()
    @Field(()=>Int)
    amount :number

    // 오타나면 곤란해지기 때문에 enum타입으로 설정해야함
    // 이 컬럼은 enum 타입이고 그 enum은 POINT_TRANSACTION_STATUS_ENUM 형태로 들어갈 거야~  
    @Column({ type: "enum", enum: POINT_TRANSACTION_STATUS_ENUM })
    @Field(()=> POINT_TRANSACTION_STATUS_ENUM)
    status: string

    // 유저 한 명(1)이 여러 번의 결제(n)를 할 수 있다
    @ManyToOne(()=>Users)
    @Field(()=>Users)
    user: Users

    @CreateDateColumn()             // 따로 입력하지 않아도 자동으로 날짜 생성
    @Field(()=>Date)
    createdAt: Date
}