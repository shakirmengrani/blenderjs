import * as express from 'express'
import {Route, Controller} from '../../common/decorators'
import {IAuthController} from '../../common/interfaces/authController'
import * as message from '../../../constant/message'
import { LoginValidation, RegisterValidation } from './validation'
import {AuthService} from './service'
import { removeFromObject } from '../../helpers/objectFilter'

const authService: AuthService = new AuthService()
@Controller(null, true)
export class Auth implements IAuthController{

    @Route("POST", "/login", true)
    async Login(req: express.Request, res: express.Response, next: express.NextFunction){
        try{
            const isValid = new LoginValidation(req.body).process()
            if(isValid.length > 0){
                res.sendError(isValid, message.ErrorMsg.INVALID)
            }else{
                const userToken = await authService.login(req.body)
                res.sendJSON(userToken)
            }
        }catch(err){
            console.log("error", err)
            res.sendError(err, message.ErrorMsg.SERVER_ERROR)
        }
    }

    @Route("POST", "/register", true)
    async Register(req: express.Request, res: express.Response, next: express.NextFunction){
        try{
            const isValid = new RegisterValidation(req.body).process()
            if(isValid.length > 0){
                res.sendError(isValid, message.ErrorMsg.INVALID)
            }else{
                const user = await authService.register( removeFromObject(req.body, ["role_id"])[0], req.body.role_id)
                res.sendJSON(user)
            }
        }catch(err){
            res.sendError(null, message.ErrorMsg.SERVER_ERROR)
        }
    }

    @Route("POST", "/refresh")
    async RefreshToken(req: express.Request, res: express.Response, next: express.NextFunction){
        res.sendError(null, message.ErrorMsg.YET_NOT_IMPL)
    }

    @Route("POST", "/logout")
    async Logout(req: express.Request, res: express.Response, next: express.NextFunction){
        res.sendError(null, message.ErrorMsg.YET_NOT_IMPL)
    }

    @Route("POST", "/forget", true)
    async Forget(req: express.Request, res: express.Response, next: express.NextFunction){
        res.sendError(null, message.ErrorMsg.YET_NOT_IMPL)
    }
}