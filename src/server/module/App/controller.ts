import * as express from 'express'
import {Route, Controller} from '../../common/decorators'
import {IController} from '../../common/interfaces/controller'
import * as message from '../../../constant/message'

@Controller()
export class App implements IController{

    @Route("GET", "/")
    async Get(req: express.Request, res: express.Response, next: express.NextFunction){
        res.sendError(null, message.ErrorMsg.YET_NOT_IMPL)
    }

    @Route("GET", "/:id")
    async Find(req, res, next){
        res.sendError(null, message.ErrorMsg.YET_NOT_IMPL)
    }

    @Route("POST", "/")
    async Create(req, res, next){
        res.sendError(null, message.ErrorMsg.YET_NOT_IMPL)
    }

    @Route("PUT", "/:id")
    async Update(req, res, next){
        res.sendError(null, message.ErrorMsg.YET_NOT_IMPL)
    }

    @Route("DELETE", "/:id")
    async Remove(req, res, next){
        res.sendError(null, message.ErrorMsg.YET_NOT_IMPL)
    }
    
}