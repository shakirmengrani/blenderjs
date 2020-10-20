import express from 'express'
import bodyParser from 'body-parser'
import AppConfig from '../config/app'

export default class {
    private App: express.Application
    private port: number

    constructor(port: number){
        this.port = port
        this.App = express()
        this.App.use(bodyParser.json())
    }
    async listen(){
        await this.initMiddlewares()
        await this.initRoutes()
        this.App.use((req, res) => {
            res.sendError(null, "Route not found")
        })
        this.App.listen(this.port)
    }
    async initMiddlewares(){
        for(let middleware of AppConfig.middlewares){
            if(middleware.pos == "before"){
                this.App.use((await import(middleware.url)).default.process)
            }
        }
    }

    async initRoutes(){
        // Register module
        this.App.use("/admin", (await import("./routes/admin/routes")).default)
    }
    

}