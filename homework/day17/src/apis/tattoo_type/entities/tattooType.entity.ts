import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class TattooType{
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    id_type: number

    @Column()
    @Field(()=> String)
    name_type: string


}