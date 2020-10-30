import * as express from 'express'
import { OrderModel } from '../../../../model/Order'
import { UserModel } from '../../../../model/User'
import * as messages from '../../../../constant/message'
import * as modules from '../../../../constant/module'
import { removeFromObject, excludeOthers } from '../../../../library/objectFilter'

export class Order {
    public routes: express.Router = express.Router()
    
    constructor(){
        this.routes.get("/", this.getOrders)
        this.routes.post("/", this.createOrder)
        this.routes.put("/:id", this.updateOrder)
    }

    async getOrders(req: express.Request, res: express.Response){
        try{
            const {from, to, status} = req.query;
            const orders = await OrderModel.getOrdersByDateRange(from.toString(), to.toString(), parseInt(status.toString()))
            res.sendJSON(orders)
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }

    async createOrder(req: express.Request, res: express.Response){
        try{
            const user = await UserModel.getUserByMobile(req.body.mobile)
            if(!user){
                await UserModel.createUser(excludeOthers(req.body, ["name", "mobile", "email"])[0], modules.ROLES.CUSTOMER)
            }
            const newOrder = await OrderModel.makeOrder(removeFromObject(req.body, ["mobile"])[0], req.body.mobile)
            res.sendJSON(newOrder, messages.Success(messages.SuccessMsg.CREATE, modules.ORDER))
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }

    async updateOrder(req: express.Request, res: express.Response){
        try{
            const {id} = req.params
            const order = await OrderModel.updateOrder(parseInt(id.toString()),req.body)
            res.sendJSON(order, messages.Success(messages.SuccessMsg.UPDATE, modules.ORDER))
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }   
}