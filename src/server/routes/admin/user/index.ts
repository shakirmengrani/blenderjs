import * as express from 'express'
import { UserModel } from '../../../../model/User'
import * as messages from '../../../../constant/message'
import * as modules from '../../../../constant/module'
export class User {
    public routes: express.Router = express.Router()
    
    constructor(){
        this.routes.post("/login", this.loginUser)
        this.routes.post("/refreshtoken", this.refreshToken)
        this.routes.post("/register", this.createUser)
    }

    async refreshToken(req: express.Request, res: express.Response){
        try{
            if(req.user){
                const token = await UserModel.loginByToken(req.user["id"])
                res.sendJSON(token)
            }else{
                res.sendError(null, messages.Error(messages.ErrorMsg.ACCESS_DENIED))    
            }
        }catch(err){
            res.sendError(err, messages.Error(messages.ErrorMsg.SERVER_ERROR))
        }
    }
    async loginUser(req: express.Request, res: express.Response){
        try{
            const token = await UserModel.loginByEmailMobile(req.body.email, req.body.mobile, req.body.password)
            res.sendJSON(token)
        }catch(err){
            res.sendError(err, messages.Error(messages.ErrorMsg.SERVER_ERROR))
        }
    }

    async createUser(req: express.Request, res: express.Response){
        try{
            const role = await UserModel.getRoleById(1)
            const newUser = await UserModel.createUser(req.body, [role])
            res.sendJSON(newUser, messages.Success(messages.SuccessMsg.CREATE, modules.USER))
        }catch(err){
            res.sendError(err, messages.Error(messages.ErrorMsg.SERVER_ERROR))
        }
    }
    
}