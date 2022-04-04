import { Review } from 'src/apis/review/entities/review.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id_user: string

    @Column()
    birth_user: Date

    @Column()
    email_user: string

    @Column()
    phone_user: string

    @Column()
    password : string
    
    @Column()
    desc_user: string

    @Column()
    type_user: boolean
    //  true일 경우 타투이스트, false일 경우 일반 고객

    // N:M
    // 1. 유저 - 리뷰 테이블 (도안에 주는 리뷰가 아니라 타투이스트(회원)에게 주는 리뷰)
    @JoinTable()
    @ManyToMany( () => Review, (reviews) => reviews.users)
    reviews: Review[]

}
