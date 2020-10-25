import * as fs from 'fs'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import {config as AppConfig} from '../config/app'
import { Passport } from '../library/passport'
export class App {
    private App: express.Application
    private port: number

    constructor(port: number){
        this.port = port
        this.App = express()
        this.App.use(bodyParser.json())
        this.App.use(Passport.initialize())
    }
    async listen(){
        this.App.get("/", (req, res) => {
            const pkg = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`).toString())
            res.status(200).json({
                name: pkg.name,
                version: pkg.version,
                description: pkg.description,
                environment: process.env.NODE_ENV
            })
        })
        await this.initMiddlewares()
        await this.initRoutes()
        this.App.use((req, res) => {
            res.sendError(null, "Route not found")
        })
        this.App.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
    async initMiddlewares(){
        for(let middleware of AppConfig.middlewares){
            if(middleware.pos == "before"){
                console.log("Loading middleware", `${middleware.url}`)
                this.App.use((await import(middleware.url)).middleware.process)
            }
        }
    }

    async initRoutes(){
        // Register module
        for(let route of fs.readdirSync(`${__dirname}/routes`)){
            console.log("Loading routes", `./routes/${route}/routes`)
            this.App.use(`/${route}`, (await import(`./routes/${route}/routes`)).router)
        }
    }
}