import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Method {
    @PrimaryGeneratedColumn()
    @Field( ()=> Int )
    id_method: number

    @Column()
    @Field(() => String)
    name_method: string
}