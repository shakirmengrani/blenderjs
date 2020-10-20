import express, {Router} from 'express'

export default class {
    public routes: Router = Router()
    
    constructor(){
        this.routes.get("/", this.getUsers)
    }

    async getUsers(req: express.Request, res: express.Response) {
        res.sendJSON(["name", "email"])
    }
    
}