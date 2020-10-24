import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import { User } from './User'

@Entity({
    name: "orders"
})
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderNumber: string;

    @Column()
    status: Number

    @Column("float")
    price: Number

    @Column("float")
    received: Number

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt: Date;

    @OneToOne(() => User)
    user: User
}
