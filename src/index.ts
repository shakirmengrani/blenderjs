import {App} from './server/app'
import {connection} from './library/typeorm'
import * as messages from './constant/message'

connection().then(() => new App(Number(process.env.PORT) || 80).listen()).catch(err => console.log(messages.ErrorMsg.DATABASE_CONNECTION_FAILED, err))