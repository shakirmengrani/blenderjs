import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { UserRole } from './UserRole'
@Entity({
    name: "users"
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mobile: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column( "boolean", { default: () => "true" } )
    isActive: boolean;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt: Date;

    @ManyToMany(() => UserRole, {
        cascade: ["insert", "update", "remove", "soft-remove", "recover"]
    })
    @JoinTable({
        name: "user_user_roles"
    })
    roles: UserRole[];
}
