import { Request, Response, NextFunction } from 'express'
import * as passport from 'passport'
import {config as appConfig} from '../../config/app'
import * as messages from '../../constant/message'

export class middleware {
    static process(req: Request, res: Response, next: NextFunction){
        const authorization = (req.get('Authorization') || req.headers['Authorization'] || 'undefined').toString();
        if (authorization !== 'undefined') {
            passport.authenticate("jwt", {session: false},(_, user, err) => {
                if(err || _){
                    res.sendError(err, _ || messages.Error(messages.ErrorMsg.UN_AUTHORIZE), 401)
                }else{
                    req.user = user
                    next();
                }
            })(req, res, next);
        }else{
            const is_secure = appConfig.auth.securePath.some((path: string) => {
                const patt = new RegExp(path);
                return  patt.exec(req.path) ? true : false;
            })
            if(is_secure){
                for(let word of appConfig.auth.examptKeyword){
                    if(req.path.indexOf(word) > -1){
                        return next()
                    }
                }
                res.sendError(null, messages.Error(messages.ErrorMsg.UN_AUTHORIZE), 401)
            }else{
                next()
            }
        }
    }
}