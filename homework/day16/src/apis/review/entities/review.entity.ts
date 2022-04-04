import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from 'src/apis/users/entities/users.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id_review: string

    @Column()
    desc_review: string

    @Column()
    url_review: string

    @Column()
    star: number   
    
    @ManyToMany(()=> Users, (users) => users.reviews)
    users: Users[]
}
