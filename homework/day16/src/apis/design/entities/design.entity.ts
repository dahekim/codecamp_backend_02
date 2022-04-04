import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Design {
    @PrimaryGeneratedColumn('uuid')
    id_design: string

    @Column()
    name_design: string


}