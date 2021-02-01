import { Request, Response, NextFunction } from 'express'

export class middleware {
    static process(req: Request, res: Response, next: NextFunction){
        // Just for temp impl
        if(req.query.hasOwnProperty("page")){
            req.query.offset = req.query.page ? req.query.page : "0"
        }
        req.offset = req.query.offset ? parseInt(req.query.offset.toString()) : 0;
        // const lang = (req.get('LANG') || req.headers['LANG'] || 'en').toString();
        // req.setLocale(lang)
        res.sendJSON = function (data: Array<any> | Object, msg: string = "") {
            let resObj: object | any = {status: true, message: msg ? msg : msg, error: null};
            if (typeof data == "object") {
                resObj.data = data;
            } else {
                resObj.data = {app_code: data};
            }
            return res.status(200).json(resObj);
        }

        res.sendError = function (error_obj: Array<any> | Object | null, msg: string = "") {
            return res.status(!isNaN(parseInt(msg.split(" ")[0].substr(0,3))) ? parseInt(msg.split(" ")[0].substr(0,3)) : 500).json({ status: false, message: msg ? msg : msg, data: null, error: error_obj });
        }
        res.log = function(...rest): void {
            if(process.env.NODE_ENV == "development"){
                console.log(...rest)
            }
        }
        return next();
    }
}
