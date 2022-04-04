import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bodypart {
    @PrimaryGeneratedColumn()
    id_part: number

    @Column()
    name_part: string

    @Column()
    size: string
}