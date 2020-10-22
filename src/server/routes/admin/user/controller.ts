import * as express from 'express'
import { getConnection } from 'typeorm'

export default class {
    public routes: express.Router = express.Router()
    
    constructor(){
        this.routes.get("/", this.getUsers)
        this.routes.post("/", this.createUser)
    }

    async getUsers(req: express.Request, res: express.Response) {
        
        res.sendJSON(["name", "email"])
    }

    async createUser(req: express.Request, res: express.Response){
        try{
            const newUser = await getConnection().getRepository("User").save({
                first_name: "Shakir",
                last_name: "Mengrani",
                age: 29
            })
            res.sendJSON(newUser)
        }catch(err){
            console.log("err", err)
            res.sendError(err)
        }
        
    }
    
}