import { Request, Response, NextFunction } from 'express'
import * as messages from '../../constant/message'
export class middleware {
    static process(req: Request, res: Response, next: NextFunction){
        if(req.user){
            const _role = req.url.split("/")[1];
            if(String(req.user["role"]).toLocaleLowerCase() === _role){
                next()
            }else if(_role == "graphql"){
                next()
            }else{
                // nested / inner role
                res.sendError(null, messages.Error(messages.ErrorMsg.UN_AUTHORIZE), 401);
            }
        }else{
            next()
        }
    }
}