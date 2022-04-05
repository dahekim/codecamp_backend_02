import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Design } from 'src/apis/design/entities/design.entity';
import { Method } from 'src/method/entities/method.entity';
import { Users } from 'src/apis/users/entities/users.entity'; 
import { Bodypart } from 'src/apis/bodypart/entities/bodypart.entity';
import { TattooLocation } from 'src/apis/location/entities/location.entity';
import { TattooType } from 'src/apis/tattoo_type/entities/tattooType.entity';
import { TattooGenre } from 'src/apis/tattoo_genre/entities/tattooGenre.entity';

import { Field, Int, ObjectType } from '@nestjs/graphql';


@Entity()
@ObjectType()
export class Tattoo {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id_tattoo: string

    @Field(() => String)
    name_tattoo: string

    @Column()
    @Field(() => String)
    date_tattoo: string

    @Column({nullable: true})
    @Field(() => String)
    desc_tattoo: string

    @Column({default: 1})
    @Field(() => Int)
    count_tattoo: number

    @Column()
    @Field(() => Int)
    price : number
    
    @Column({default: "선불"})
    @Field(() => String)
    payment: string
    
    // 타투 작업 착수 여부
    @Column({default:false})
    @Field(()=> Boolean)
    isStart: boolean

    // 1:1
    // 1. 타투 도안 테이블
    @OneToOne(() => Design )
    @JoinColumn()
    @Field(() => Design)
    design : Design


    // 1:1
    // 2. 작업형태 테이블 (핸드포크 / 기계식)
    @OneToOne(() => Method)
    @JoinColumn()
    @Field(() => Method)
    method: Method

    // 1:N
    // 1. 유저 테이블
    @ManyToOne( () => Users)
    @Field(() => Users)
    users : Users

    // 1:N
    // 2. 신체부위 및 타투 사이즈 테이블
    @ManyToOne( () => Bodypart)
    @Field(() => Bodypart)
    bodypart : Bodypart

    // 1:N
    // 3. 지역 테이블
    @ManyToOne ( () => TattooLocation)
    @Field(() => TattooLocation)
    tattoolocation : TattooLocation

    // 1:N
    // 4. 타투 종류 테이블
    @ManyToOne( ()=> TattooType)
    @Field(() => TattooType)
    tattooType: TattooType

    // 1:N
    // 5. 타투 장르 테이블
    @ManyToOne(()=> TattooGenre)
    @Field(() => TattooGenre)
    tattooGenre : TattooGenre

}
