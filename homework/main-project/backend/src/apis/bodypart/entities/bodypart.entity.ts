import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Bodypart {
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    id_part: number

    @Column()
    @Field(()=> String)
    name_part: string

    @Column()
    @Field(()=> String)
    size: string
}