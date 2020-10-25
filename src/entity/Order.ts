import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from './User'

@Entity({
    name: "orders"
})
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderNumber: string;

    @Column({default: () => "0"})
    status: Number

    @Column("float", {default: () => "0"})
    price: Number

    @Column("float", {default: () => "0"})
    received: Number

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt: Date;

    @ManyToOne(() => User)
    user: User
}
