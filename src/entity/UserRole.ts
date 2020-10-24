import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { User } from "./User"
@Entity({
    name: "user_roles"
})
export class UserRole {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column( "boolean", { default: () => "true" } )
    isActive: boolean;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt: Date;

    @ManyToMany(() => User, user => user.roles)
    questions: User[];
}