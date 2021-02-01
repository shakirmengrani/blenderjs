import * as express from 'express'
import {Route, Controller} from '../../common/decorators'
import {IAuthfController} from '../../common/interfaces/authController'
import * as message from '../../../constant/message'
import { LoginValidation, RegisterValidation } from './validation'
import {AppService} from './service'

@Controller(null, true)
export class Auth implements IAuthfController{
    private appService: AppService;

    constructor(){
        this.appService = new AppService()
    }
    @Route("POST", "/login", true)
    async Login(req: express.Request, res: express.Response, next: express.NextFunction){
        try{
            const isValid = new LoginValidation(req.body).process()
            if(isValid.length > 0){
                res.sendError(isValid, message.ErrorMsg.INVALID)
            }else{
                const userToken = await this.appService.login(req.body.mobile, req.body.password)
                res.sendJSON(userToken)
            }
        }catch(err){
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
                const user = await this.appService.register(req.body)
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