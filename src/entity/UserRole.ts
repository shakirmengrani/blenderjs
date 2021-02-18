import { ObjectType, Field, ID } from 'type-graphql'
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { User } from "./User"
@ObjectType()
@Entity({name: "user_roles"})
export class UserRole {
    
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column( "boolean", { default: () => "true" } )
    isActive: boolean;

    @Field()
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Field()
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt: Date;

    @Field(() => [User])
    @ManyToMany(() => User, user => user.roles)
    users: Array<User>;
}