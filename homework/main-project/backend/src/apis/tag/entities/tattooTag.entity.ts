import { Field, ObjectType } from '@nestjs/graphql';
import { Tattoo } from 'src/apis/tattoo/entities/tattoo.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class TattooTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id_tag: string;

  @Column()
  @Field(() => String)
  name_tag: string;

  @ManyToMany(() => Tattoo, (tattoos) => tattoos.tattooTags)
  @Field(() => [Tattoo])
  tattoos: Tattoo[];
}
