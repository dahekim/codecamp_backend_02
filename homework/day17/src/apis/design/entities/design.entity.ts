import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Design {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id_design: string

    @Column()
    @Field(() => String)
    name_design: string


}