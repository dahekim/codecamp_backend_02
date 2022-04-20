import { Field, ObjectType } from "@nestjs/graphql";
import { Tattoo } from "src/apis/tattoo/entities/tattoo.entity";
import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    JoinColumn, 
    ManyToOne } from "typeorm";

@Entity()
@ObjectType()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id_img: string

    @Column()
    @Field(() => String, { nullable: true })
    url?: string

    @JoinColumn()
    @ManyToOne(()=> Tattoo)
    @Field(() => Tattoo, { nullable: false })
    tattooId?: Tattoo
}