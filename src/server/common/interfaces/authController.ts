import * as express from 'express'

export interface IAuthfController{
    Login(req: express.Request, res: express.Response, next: express.NextFunction)
    Register(req: express.Request, res: express.Response, next: express.NextFunction)
    Logout(req: express.Request, res: express.Response, next: express.NextFunction)
    RefreshToken(req: express.Request, res: express.Response, next: express.NextFunction)
    Forget(req: express.Request, res: express.Response, next: express.NextFunction)
}
