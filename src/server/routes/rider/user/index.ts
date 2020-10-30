import * as express from 'express'
import { UserModel } from '../../../../model/User'
import { OrderModel } from '../../../../model/Order'
import * as messages from '../../../../constant/message'
import * as modules from '../../../../constant/module'
import  * as validation from './validation'

export class User {
    public routes: express.Router = express.Router()
    
    constructor(){
        this.routes.get("/orders", this.getOrders)
        this.routes.post("/login", validation.UserLogin.process, this.loginUser)
        this.routes.post("/refreshtoken", this.refreshToken)
        this.routes.post("/register", this.createUser)
    }
    
    async getOrders(req: express.Request, res: express.Response){
        try{
            const orders = await OrderModel.getOrdersByUserId(req.user["id"], "users.rider_orders")
            res.sendJSON(orders)
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }

    async refreshToken(req: express.Request, res: express.Response){
        try{
            const token = await UserModel.loginByToken(req.user["id"])
            res.sendJSON(token)
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }
    async loginUser(req: express.Request, res: express.Response){
        try{
            const token = await UserModel.loginByEmailMobile(req.body.email, req.body.mobile, req.body.password)
            res.sendJSON(token)
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }

    async createUser(req: express.Request, res: express.Response){
        try{
            const newUser = await UserModel.createUser(req.body, modules.ROLES.RIDER)
            res.sendJSON(newUser, messages.Success(messages.SuccessMsg.CREATE, modules.USER))
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }
    
}