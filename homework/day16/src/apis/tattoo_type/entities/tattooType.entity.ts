import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TattooType{
    @PrimaryGeneratedColumn()
    id_type: number

    @Column()
    name_type: string


}