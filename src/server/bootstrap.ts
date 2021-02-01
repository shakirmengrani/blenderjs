import ctx from './context'
import {App} from './module/App/controller'
import {Auth} from './module/Auth/controller'

export default class {
    __init__(){
        [
            App, 
            Auth
        ]
        .forEach(cls => Object.call(cls, "constructor"))
    }

    makeRoute(app){
        ctx.routes.forEach(route => {
            if(ctx.controllers[route["target"]]){
                let _path = `/${ctx.controllers[route["target"]].name.toLowerCase()}${route["path"]}`
                if(ctx.controllers[route["target"]].is_secure){
                    ctx.securePath.push(ctx.controllers[route["target"]].name.toLowerCase())
                }
                if(route["is_exampt"]){
                    ctx.examptKeyword.push(_path)
                }
                console.log("Loading route", _path)
                switch(route["method"].toLowerCase()){
                    case "get":
                        app.get(_path, route["handler"])
                    break;
                    case "post":
                        app.post(_path, route["handler"])
                    break;
                    case "put":
                        app.put(_path, route["handler"])
                    break;
                    case "delete":
                        app.delete(_path, route["handler"])
                    break;
                    default:
                        app.use(_path, route["handler"])
                    break;
                }
            }
        })
    }
}