import * as express from 'express'
import { OrderModel } from '../../../../model/Order'
import * as messages from '../../../../constant/message'
import * as modules from '../../../../constant/module'

export class Order {
    public routes: express.Router = express.Router()

    constructor(){
        this.routes.get("/", this.getOrders)
    }

    async getOrders(req: express.Request, res: express.Response){
        try{
            const orders = await OrderModel.getOrdersByUserId(req.user["id"], "users.rider_orders", modules.ORDER_STATUS.SHIPPED)
            res.sendJSON(orders)
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }

    
}