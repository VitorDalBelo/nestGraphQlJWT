import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity,Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name:"Users"})
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column({name:"username",length:255,nullable:false})
  username: string;

  @Column({name:"password",length:255,nullable:false})
  password: string;

  @CreateDateColumn({name:"createdAt"})
  createdAt:string;
  @UpdateDateColumn({name:"updatedAt"})
  updatedAt:string;
  @DeleteDateColumn({name:"deletedAt"})
  deletedAt:string;

}
