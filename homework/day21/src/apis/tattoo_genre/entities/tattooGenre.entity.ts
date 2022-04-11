import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class TattooGenre{
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    id_genre: number

    @Column()
    @Field(()=> String)
    name_genre: string


}