import { Field, ObjectType } from "@nestjs/graphql";
import { Tattoo } from "src/apis/tattoo/entities/tattoo.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id_img: string

    @Column()
    @Field(() => String)
    url: string

    @Column(() => Tattoo)
    @Field(() => Tattoo)
    tattooId: Tattoo
}