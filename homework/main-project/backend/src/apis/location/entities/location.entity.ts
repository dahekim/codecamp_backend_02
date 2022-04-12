import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class TattooLocation{
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    id_location: number

    @Column()
    @Field(()=> String)
    name_location: string


}