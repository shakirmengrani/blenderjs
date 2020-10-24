import { Request, Response, NextFunction } from 'express'
import * as passport from 'passport'
import {config as appConfig} from '../../config/app'

export default class {
    static process(req: Request, res: Response, next: NextFunction){
        const authorization = (req.get('Authorization') || req.headers['Authorization'] || 'undefined').toString();
        if (authorization !== 'undefined') {
            passport.authenticate("jwt", {session: false},(_, user, err) => {
                if(err || _){
                    res.sendError(err, _ || "Un-Authorized user !", 401);
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
                if(
                    req.path.indexOf("forget") > -1 ||
                    req.path.indexOf("resend") > -1 ||
                    req.path.indexOf("verify") > -1 ||
                    req.path.indexOf("ws") > -1 || 
                    req.path.indexOf("code") > -1 || 
                    req.path.indexOf("check") > -1 || 
                    req.path.indexOf("register") > -1 || 
                    req.path.indexOf("login") > -1 || 
                    req.path.indexOf("api-docs") > -1){
                    next()    
                }else{
                    res.sendError(null, "Un-Authorized user !", 401);
                }
            }else{
                next()
            }
        }
    }
}