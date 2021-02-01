import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, getRepository} from "typeorm";
import { UserRole } from './UserRole'
import * as message from '../constant/message'
@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true, nullable: false})
    mobile: string;

    @Column({unique: true, nullable: true})
    email: string;

    @Column({nullable: true})
    password: string;

    @Column( "boolean", { default: () => "true" } )
    isActive: boolean;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt: Date;

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
    roles: UserRole[]; 
}
