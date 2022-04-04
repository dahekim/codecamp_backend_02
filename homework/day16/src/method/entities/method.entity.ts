import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Method {
    @PrimaryGeneratedColumn()
    id_method: number

    @Column()
    name_method: string


}