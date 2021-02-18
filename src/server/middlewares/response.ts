import { Request, Response, NextFunction } from 'express'
import {config as AppConfig} from '../../config/app'
export class middleware {
    static process(req: Request, res: Response, next: NextFunction){
        req.take = Number(req.query.take) || AppConfig.pagination.limit
        req.skip = Number(req.query.skip) || 0
        // const lang = (req.get('lang') || req.headers['lang'] || 'en').toString();
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
