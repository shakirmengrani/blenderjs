import * as express from 'express'
import { UserModel } from '../../../../model/User'
import * as messages from '../../../../constant/message'
import * as modules from '../../../../constant/module'
import  * as validation from './validation'

export class User {
    public routes: express.Router = express.Router()
    
    constructor(){
        
        this.routes.post("/login", validation.UserLogin.process, this.loginUser)
        this.routes.post("/refreshtoken", this.refreshToken)
        this.routes.post("/register", this.createUser)
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
            const newUser = await UserModel.createUser(req.body, modules.ROLES.ADMIN)
            res.sendJSON(newUser, messages.Success(messages.SuccessMsg.CREATE, modules.USER))
        }catch(err){
            res.sendError(err, messages.Error(err.message))
        }
    }
    
}