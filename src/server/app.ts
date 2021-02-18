import * as fs from 'fs'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import Bootstrap from './bootstrap'
import {config as AppConfig} from '../config/app'
import { Passport } from '../library/passport'
export class App {
    private App: express.Application
    private port: number
    private boot: Bootstrap = new Bootstrap()
    constructor(port: number){
        this.port = port
        this.App = express()
        this.App.use(bodyParser.json())
        this.App.use(Passport.initialize())
        this.boot.__init__()
    }

    async listen(){
        this.App.get("/", (req, res) => {
            const pkg = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`).toString())
            res.status(200).json({ name: pkg.name, version: pkg.version, description: pkg.description, environment: process.env.NODE_ENV})
        })
        for(let middleware of AppConfig.middlewares){
            if(middleware.pos == "before"){
                this.App.use((await import(middleware.url)).middleware.process)
            }
        }
        this.boot.makeRoute(this.App)
        await this.boot.graphal(this.App)
        this.App.use((req, res) => res.sendError(null, "Route not found"))
        this.App.listen(this.port, () => console.log(`Server is running on port ${this.port}`))        
    }
}