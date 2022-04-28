import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class ProductCategory {
    @PrimaryGeneratedColumn("uuid")
    @Field( () => String)
    id: string
    

    // 카테고리의 이름
    // 제약조건 설정 (unique:true)
    @Column({ unique : true, nullable :true })
    @Field( () => String)
    name: string
}
