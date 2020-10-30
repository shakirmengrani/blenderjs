import * as express from 'express'
import * as jf from 'joiful'

export class Validation{
    @jf.string().required()
    mobile: string 

    @jf.string().required().min(6)
    password: string

    static process(req: express.Request, res: express.Response, next: express.NextFunction){
        const login: Validation = new Validation()
        login.mobile = req.body.mobile
        login.password = req.body.password
        const {error} = jf.validate(login)
        if(error){
            res.sendError(error.details.map(detail => detail.message), error.details.map(detail => detail.message)[0])
        }else{
            next()
        }
    }
}