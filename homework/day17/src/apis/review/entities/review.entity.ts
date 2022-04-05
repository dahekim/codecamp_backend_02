import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from 'src/apis/users/entities/users.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    @Field(()=> String)
    id_review: string

    @Column()
    @Field(()=> String)
    desc_review: string

    @Column()
    @Field(()=> String)
    url_review: string

    @Column()
    @Field(()=> Int)
    star: number   
    
    @ManyToMany(()=> Users, (users) => users.reviews)
    @Field(()=> [Users])
    users: Users[]
}
