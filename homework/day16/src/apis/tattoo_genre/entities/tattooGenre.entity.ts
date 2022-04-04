import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TattooGenre{
    @PrimaryGeneratedColumn()
    id_genre: number

    @Column()
    name_genre: string


}