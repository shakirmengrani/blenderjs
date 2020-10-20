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
        this.initMiddlewares()
    }

    initMiddlewares(){
        for(let middleware of AppConfig.middlewares){
            if(middleware.pos == "before"){
                this.App.use(require(middleware.url))
            }
        }
    }

    listen(){
        this.App.listen()
    }

}