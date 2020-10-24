import {App} from './server/app'
import {connection} from './library/typeorm'
import * as messages from './constant/message'
connection().then(() => {
    new App(4000).listen()
}).catch(err => console.log(messages.ErrorMsg.DATABASE_CONNECTION_FAILED, err))