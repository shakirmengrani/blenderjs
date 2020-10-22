import App from './server/app'
import {connection} from './library/typeorm'
connection().then(() => {
    new App(4000).listen()
}).catch(err => console.log(err))