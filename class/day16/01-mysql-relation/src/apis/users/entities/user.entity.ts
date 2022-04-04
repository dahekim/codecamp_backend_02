


import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string

    @Column()
    password: string
}
