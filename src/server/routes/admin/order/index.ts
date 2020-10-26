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
            const orders = await UserModel.getOrdersByDateRange(from.toString(), to.toString(), parseInt(status.toString()))
            if(orders.length > 0){
                res.sendJSON(orders)
            }else{
                res.sendError(null, messages.Error(messages.ErrorMsg.NOT_FOUND))    
            }
        }catch(err){
            res.sendError(err, messages.Error(messages.ErrorMsg.SERVER_ERROR))
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
            res.sendError(err, messages.Error(messages.ErrorMsg.SERVER_ERROR))
        }
    }

    async updateOrder(req: express.Request, res: express.Response){
        try{

        }catch(err){
            res.sendError(err, messages.Error(messages.ErrorMsg.SERVER_ERROR))
        }
    }
    
}