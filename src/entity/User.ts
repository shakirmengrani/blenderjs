import { ObjectType, Field, ID } from 'type-graphql'
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { UserRole } from './UserRole'
import { __Type } from 'graphql';
@ObjectType()
@Entity({name: "users"})
export class User {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column({nullable: true})
    name?: string;
    
    @Field()
    @Column({unique: true, nullable: false})
    mobile?: string;
    
    @Field()
    @Column({unique: true, nullable: true})
    email?: string;

    @Field()
    @Column({nullable: true})
    password?: string;

    @Field()
    @Column( "boolean", { default: () => "true" } )
    isActive?: boolean;
    
    @Field()
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP"})
    createdAt?: Date;

    @Field()
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt?: Date;

    @Field(() => [UserRole])
    @ManyToMany(() => UserRole, {cascade: ["insert", "update", "remove", "soft-remove", "recover"]})
    @JoinTable({
        name: "user_user_roles",
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        },
        joinColumn: {
            referencedColumnName: "id",
            name: "user_id"
        }
    })
    roles?: Array<UserRole>; 
}
