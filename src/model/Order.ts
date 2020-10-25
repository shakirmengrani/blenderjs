import { getRepository } from 'typeorm'
import { Order } from '../entity/Order'
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
    
}