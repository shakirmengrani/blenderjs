import * as express from 'express'
import { OrderModel } from '../../../../model/Order'
import * as messages from '../../../../constant/message'
import * as modules from '../../../../constant/module'
import { removeFromObject } from '../../../../library/objectFilter'
export class Order {
    public routes: express.Router = express.Router()
    
    constructor(){
        this.routes.post("/", this.createOrder)
    }


    async createOrder(req: express.Request, res: express.Response){
        try{
            const newOrder = await OrderModel.makeOrder(removeFromObject(req.body, ["mobile"])[0], req.body.mobile)
            res.sendJSON(newOrder, messages.Success(messages.SuccessMsg.CREATE, modules.ORDER))
        }catch(err){
            res.sendError(err, messages.Error(messages.ErrorMsg.SERVER_ERROR))
        }
    }
    
}