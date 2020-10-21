import * as express from 'express'
export default class {
    public routes: express.Router = express.Router()
    
    constructor(){
        this.routes.get("/", this.getUsers)
    }

    async getUsers(req: express.Request, res: express.Response) {
        
        res.sendJSON(["name", "email"])
    }
    
}