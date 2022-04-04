import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TattooLocation{
    @PrimaryGeneratedColumn()
    id_location: number

    @Column()
    name_location: string


}