import { Response } from "express-serve-static-core";

declare module "express-serve-static-core" {
    export interface Request {
        take?: number
        skip?: number
        user?: object
    }
    export interface Response {
        sendJSON(data: Array<any> | Object | null, msg?: string): Response<any>
        sendError(error_obj: Array<any> | Object | null, msg?: string, status?: number): Response<any>
        log(...rest): void
    }
}