import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Design } from 'src/apis/design/entities/design.entity';
import { Method } from 'src/method/entities/method.entity';
import { Users } from 'src/apis/users/entities/users.entity'; 
import { Bodypart } from 'src/apis/bodypart/entities/bodypart.entity';
import { TattooLocation } from 'src/apis/location/entities/location.entity';
import { TattooType } from 'src/apis/tattoo_type/entities/tattooType.entity';
import { TattooGenre } from 'src/apis/tattoo_genre/entities/tattooGenre.entity';


@Entity()
export class Tattoo {
    @PrimaryGeneratedColumn('uuid')
    id_tattoo: string

    @Column()
    date_tattoo: Date

    @Column()
    desc_tattoo: string

    @Column()
    count_tattoo: number

    @Column()
    price : number
    
    @Column()
    payment: string
    
    // 1:1
    // 1. 타투 도안 테이블
    @OneToOne(() => Design )
    @JoinColumn()
    design : Design


    // 1:1
    // 2. 작업형태 테이블 (핸드포크 / 기계식)
    @OneToOne(() => Method)
    @JoinColumn()
    method: Method

    // 1:N
    // 1. 유저 테이블
    @ManyToOne( () => Users)
    users : Users

    // 1:N
    // 2. 신체부위 및 타투 사이즈 테이블
    @ManyToOne( () => Bodypart)
    bodypart : Bodypart

    // 1:N
    // 3. 지역 테이블
    @ManyToOne ( () => TattooLocation)
    tattoolocation : TattooLocation

    // 1:N
    // 4. 타투 종류 테이블
    @ManyToOne( ()=> TattooType)
    tattooType: TattooType

    // 1:N
    // 5. 타투 장르 테이블
    @ManyToOne(()=> TattooGenre)
    tattooGenre : TattooGenre

}
