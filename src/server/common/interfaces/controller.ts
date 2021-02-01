import * as express from 'express'

export interface IController{
    Get(req: express.Request, res: express.Response, next: express.NextFunction)
    Find(req: express.Request, res: express.Response, next: express.NextFunction)
    Create(req: express.Request, res: express.Response, next: express.NextFunction)
    Update(req: express.Request, res: express.Response, next: express.NextFunction)
    Remove(req: express.Request, res: express.Response, next: express.NextFunction)
}
