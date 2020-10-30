import { getRepository } from 'typeorm'
import { Order } from '../entity/Order'
import { User } from '../entity/User'
import { UserModel } from './User'
import * as messages from '../constant/message'

export class OrderModel{

    static async makeOrder(params: object, mobile: string): Promise<Order> {
        const user = await UserModel.getUserByMobile(mobile)
        if(user){
            const newOrder = new Order()
            for(let param of Object.keys(params)){
                newOrder[param] = params[param]
            }
            newOrder.orderNumber = new Date().getTime().toString()
            newOrder.user = user
            return getRepository(Order).save(newOrder)
        }
        throw new Error(messages.ErrorMsg.USER_NOT_FOUND)
    }

    static async updateOrder(id: number, params: object): Promise<Order>{
        const order = await getRepository(Order).findOne(id)
        for(let param of Object.keys(params)){
            order[param] = params[param]
        }
        return getRepository(Order).save(order)
    }

    static async getOrdersByDateRange(from: string, to: string, status: number = 0, relationWith: string= "orders.user"): Promise<Order[]>{
        const orders = await getRepository(Order).manager
        .createQueryBuilder(Order, "orders")
        .innerJoin(`${relationWith}`, "users")
        .where("orders.createdAt >= :from and orders.createdAt <= :to and orders.status = :status", {from, to, status})
        .select(["orders.*", "users.name", "users.mobile", "users.email"])
        .getMany()
        if(orders.length > 0){
            return orders
        }
        throw new Error(messages.Error(messages.ErrorMsg.NOT_FOUND))
    }

    static async getOrdersByUserId(id: number, relationWith: string = "users.orders", status: number = 0): Promise<User[]> {
        const orders = await getRepository(User).manager.createQueryBuilder(User, "users")
        .innerJoin(`${relationWith}`, "orders")
        .where("orders.rider_id = :id and orders.status = :status", {id, status})
        .select(["orders.*"])
        .getMany()
        if(orders.length > 0){
            return orders
        }
        throw new Error(messages.Error(messages.ErrorMsg.NOT_FOUND))
    }
    
}