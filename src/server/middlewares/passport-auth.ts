import { Request, Response, NextFunction } from 'express'
import * as passport from 'passport'
import ctx from '../context'
import * as messages from '../../constant/message'

export class middleware {
    static process(req: Request, res: Response, next: NextFunction) {
        const authorization = (req.get('Authorization') || req.headers['Authorization'] || 'undefined').toString();
        if (authorization !== 'undefined') {
            passport.authenticate("jwt", { session: false }, (_, user, err) => {
                if (err) {
                    res.sendError(err, messages.Error(messages.ErrorMsg.UN_AUTHORIZE), 401)
                } else {
                    req.user = user
                    return next();
                }
            })(req, res, next);
        } else {
            const is_secure = ctx.securePath.some((path: string) => {
                const patt = new RegExp(path);
                return patt.exec(req.path) ? true : false;
            })
            if (is_secure) {
                for (let word of ctx.examptKeyword) {
                    if (req.path.indexOf(word) > -1) {
                        return next()
                    }
                }
                return res.sendError(null, messages.Error(messages.ErrorMsg.UN_AUTHORIZE), 401)
            } else {
                return next()
            }
        }
    }
}